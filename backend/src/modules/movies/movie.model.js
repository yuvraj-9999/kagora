import mongoose from "mongoose";
import { trim } from "zod";

const castMemberSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        charater: {
            type: String,
            default: null,
        },

        profileUrl: {
            type: String,
            default: null,
        },
    },
    {
        _id: false,
    }
);

const personSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        profileUrl: {
            type: String,
            default: null,
        },
    },
    {
        _id: false,
    }
);

const movieSchema = new mongoose.Schema(
    {
        tmdbId: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        originalTitle: {
            type: String,
            default: null,
        },

        overview: {
            type: String,
            default: null,
        },

        releaseDate: {
            type: String,
            default: null,
        },

        releaseYear: {
            type: Number,
            default: null,
        },

        rating: {
            type: Number,
            default: 0,
        },

        posterUrl: {
            type: String,
            default: null,
        },

        backdropUrl: {
            type: String,
            default: null,
        },

        language: {
            type: String,
            default: null,
        },

        tagline: {
            type: String,
            default: null,
        },

        runtime: {
            type: Number,
            default: null,
        },

        status: {
            type: String,
            default: null,
        },

        homepage: {
            type: String,
            default: null,
        },

        imdbId: {
            type: String,
            default: null,
        },

        credits: {
            directors: {
                type: [personSchema],
                default: [],
            },
            writers: {
                type: [personSchema],
                default: [],
            },
            cast: {
                type: [castMemberSchema],
                default: [],
            },
        },
    },
    {
        timestamps: true,
    }
);

export const Movie = mongoose.model("Movie", movieSchema);