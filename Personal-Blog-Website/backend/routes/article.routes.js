const express = require("express")
const { ArticleModel } = require("../models/article.model")

const articleRouter = express.Router()



// Create an article
articleRouter.post('/', async (req, res) => {
    try {
        const { title, content, author, image } = req.body;
        const article = new ArticleModel({ title, content, author, image });

        const savedArticle = await article.save();
        res.status(201).send({ message: "Article created" });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send({ error: error.message });
    }
});

// Get all articles
articleRouter.get('/', async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        res.status(200).send(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send({ error: error.message });
    }
});

// Get a single article by ID
articleRouter.get('/:id', async (req, res) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).send(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).send({ error: error.message });
    }
});

// Update an article by ID
articleRouter.put('/:id', async (req, res) => {
    const { title, content, author, publicationDate } = req.body;
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            { title, content, author, publicationDate },
            { new: true } // Return the updated article
        );
        if (!updatedArticle) {
            return res.status(404).send({ error: 'Article not found' });
        }
        res.send(updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).send({ error: error.message });
    }
});

// Delete an article by ID
articleRouter.delete('/:id', async (req, res) => {
    try {
        const deletedArticle = await ArticleModel.findByIdAndRemove(req.params.id);
        if (!deletedArticle) {
            return res.status(404).send({ error: 'Article not found' });
        }
        res.send({ message: 'Article deleted' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = { articleRouter }