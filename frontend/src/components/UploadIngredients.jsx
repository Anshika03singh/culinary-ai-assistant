import React, { useState, useRef } from 'react';
import styles from './UploadIngredients.module.css';
import { UploadCloud, X, LoaderCircle, Salad, ChefHat } from 'lucide-react';
import api from '../api'; // Import our central API handler

const UploadIngredients = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
            setIngredients([]); // Clear previous results
        }
    };

    // This is the function we are making functional
    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setError('');
        setIngredients([]);

        // FormData is the standard way to send files to a server
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Send the image to our new backend endpoint
            const response = await api.post('/recipes/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Update the state with the ingredients identified by the AI
            setIngredients(response.data.ingredients);
        } catch (err) {
            setError('Failed to analyze image. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setIngredients([]);
        setError('');
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>What's in Your Kitchen?</h2>
            <p className={styles.subtitle}>Upload a photo of your ingredients to get started.</p>
            
            <div 
                className={styles.dropzone} 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    className={styles.hiddenInput}
                />
                
                {preview ? (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Ingredients preview" className={styles.previewImage} />
                        <button onClick={(e) => { e.stopPropagation(); clearFile(); }} className={styles.clearButton}>
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <div className={styles.prompt}>
                        <UploadCloud size={48} className={styles.uploadIcon} />
                        <p>Click to browse or drag & drop an image</p>
                    </div>
                )}
            </div>
            
            {file && !isLoading && (
                 <button onClick={handleUpload} className={styles.analyzeButton} disabled={isLoading}>
                    Analyze Ingredients
                </button>
            )}

            {isLoading && (
                <div className={styles.loader}>
                    <LoaderCircle size={32} className={styles.spinner} />
                    <p>Analyzing...</p>
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {/* This is the new section to display the AI's results */}
            {ingredients.length > 0 && (
                <div className={styles.resultsContainer}>
                    <h3><Salad size={20} /> Ingredients Found:</h3>
                    <ul className={styles.ingredientList}>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <button className={styles.recipeButton}>
                        <ChefHat size={18} /> Generate Recipe
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadIngredients;