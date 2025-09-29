import React, { useState, useRef } from 'react';
import styles from './UploadIngredients.module.css';
import { UploadCloud, X, LoaderCircle, Sparkles } from 'lucide-react';
import RecipeCard from './RecipeCard';
import api from '../api';

const UploadIngredients = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
            setIngredients([]);
            setRecipe(null);
        }
    };

    const handleAnalyze = async () => {
        setIsLoadingAnalysis(true);
        setError('');
        setRecipe(null);

        // --- REAL API CALL for ingredient analysis ---
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const { data } = await api.post('/recipes/analyze-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setIngredients(data.ingredients);
        } catch (err) {
            setError('Failed to analyze image. Please try again.');
            console.error(err);
        } finally {
            setIsLoadingAnalysis(false);
        }
    };
    
    const handleGenerateRecipe = async () => {
        setIsLoadingRecipe(true);
        setError('');

        // --- REAL API CALL for recipe generation ---
        try {
            // We send the list of ingredients in the request body
            const { data } = await api.post('/recipes/generate-recipe', { ingredients });
            setRecipe(data.recipe);
        } catch (err) {
            setError('Failed to generate recipe. Please try again.');
            console.error(err);
        } finally {
            setIsLoadingRecipe(false);
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        setIngredients([]);
        setRecipe(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={styles.container}>
            {/* Logic to show/hide elements based on state */}
            {!recipe && (
                <>
                    <h2 className={styles.title}>What's in Your Kitchen?</h2>
                    <p className={styles.subtitle}>Upload a photo of your ingredients to get started.</p>
                    
                    <div className={styles.dropzone} onClick={() => fileInputRef.current?.click()}>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className={styles.hiddenInput} />
                        {preview ? (
                            <div className={styles.previewContainer}>
                                <img src={preview} alt="Ingredients preview" className={styles.previewImage} />
                                <button onClick={clearFile} className={styles.clearButton}><X size={18} /></button>
                            </div>
                        ) : (
                            <div className={styles.prompt}>
                                <UploadCloud size={48} className={styles.uploadIcon} />
                                <p>Click to browse or drag & drop an image</p>
                            </div>
                        )}
                    </div>
                </>
            )}
            
            {file && !isLoadingAnalysis && ingredients.length === 0 && (
                 <button onClick={handleAnalyze} className={styles.analyzeButton} disabled={isLoadingAnalysis}>
                    Analyze Ingredients
                </button>
            )}

            {isLoadingAnalysis && (
                <div className={styles.loader}><LoaderCircle size={32} className={styles.spinner} /><p>Analyzing...</p></div>
            )}
            
            {error && <p className={styles.error}>{error}</p>}

            {ingredients.length > 0 && !recipe && (
                <div className={styles.results}>
                    <h3>Ingredients Found:</h3>
                    <ul>{ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
                    <button onClick={handleGenerateRecipe} className={styles.generateButton} disabled={isLoadingRecipe}>
                        {isLoadingRecipe ? <LoaderCircle size={20} className={styles.spinner} /> : <Sparkles size={20} />}
                        <span>{isLoadingRecipe ? 'Generating...' : 'Generate Recipe'}</span>
                    </button>
                </div>
            )}
            
            <RecipeCard recipe={recipe} />
        </div>
    );
};

export default UploadIngredients;
