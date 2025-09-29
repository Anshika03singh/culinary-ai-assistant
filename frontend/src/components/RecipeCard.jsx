import React from 'react';
import styles from './RecipeCard.module.css';
import { ChefHat, Clock, Users } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
    if (!recipe) {
        return null;
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}><ChefHat size={28} /> {recipe.title}</h2>
            <p className={styles.description}>{recipe.description}</p>
            
            <div className={styles.meta}>
                <div className={styles.metaItem}>
                    <Clock size={18} />
                    <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className={styles.metaItem}>
                    <Clock size={18} />
                    <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className={styles.metaItem}>
                    <Users size={18} />
                    <span>Servings: {recipe.servings}</span>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.ingredients}>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>{ing.quantity} {ing.unit} {ing.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h3>Instructions</h3>
                    <ol>
                        {recipe.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
