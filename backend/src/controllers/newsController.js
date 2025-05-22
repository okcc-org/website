const { ResponseUtil } = require('../utils/ResponseDTO');
const { find, findById, create, update, remove, findRecent } = require('../models/news');
const { BadRequestError, NotFoundError, ValidationError, InternalServerError } = require('../utils/CustomError');
const fs = require('fs').promises;
const path = require('path');

// Get recent news
// 여기도 이렇게 front에 보냈을때 이미지처리를 할 수 있는지 체크해야함.
exports.getRecentNews = async (req, res, next) => {
    try {
        const news = await findRecent();
        res.status(200).json(ResponseUtil.success("Recent news fetched successfully", news));
    } catch (e) {
        next(e);
    }
};

// Get news by id
// 여기도 이렇게 front에 보냈을때 이미지처리를 할 수 있는지 체크해야함.
exports.getNewsById = async (req, res, next) => {
    try {
        const news = await findById(req.params.id);
        if (!news) {
            throw NotFoundError("News not found");
        }
        res.status(200).json(ResponseUtil.success("News fetched successfully", news));
    } catch (e) {
        next(e);
    }
};


// 여기서 시작
// 지금 create 할때 req.body 에 뭐가들어가있는지 어떻게 format이 들어오는지 체크해야함
// 이건 frontend쪽에서 어떻게 보내는지 체크해야함
// 이미지같은경우는 지금은 local 에 저장하게끔 해야함
exports.createNews = async (req, res, next) => {
    try {
        const { } = req.body
        const createdNews = await create(req.body);
        res.status(201).json(ResponseUtil.success("News created successfully", createdNews));
    } catch (e) {
        next(e);
    }
};

// 만약 image가 들어오면 기존에 있던 이미지는 로컬에서 삭제하고 새로운걸 업로드
exports.updateNews = async (req, res, next) => {
    try {
        const updatedNews = await update(parseInt(req.params.id), req.body);
        res.status(200).json(ResponseUtil.success("News updated successfully", updatedNews));
    } catch (e) {
        next(e);
    }
};

// Delete news including images
exports.deleteNews = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const news = await findById(id);
        
        if (!news) {
            throw NotFoundError("News not found");
        }

        // Delete all associated images
        try {
            // Delete thumbnail
            if (news.thumbnail) {
                const thumbnailPath = path.join(process.cwd(), news.thumbnail);
                await fs.unlink(thumbnailPath);
            }

            // Delete content images
            const imageContents = news.contents.filter(content => content.type === 'image');
            await Promise.all(
                imageContents.map(content => {
                    const imagePath = path.join(process.cwd(), content.content);
                    return fs.unlink(imagePath);
                })
            );
        } catch (error) {
            throw InternalServerError("Failed to delete associated images");
        }

        const deletedNews = await remove(parseInt(id));
        res.status(200).json(ResponseUtil.success("News deleted successfully", deletedNews));
    } catch (e) {
        next(e);
    }
};

