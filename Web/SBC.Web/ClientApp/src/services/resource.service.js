﻿import axios from "axios";

import { baseUrl } from '../constants';

const apiUrl = baseUrl + 'api/resource';

const getAll = async (lectureId) => {
    return await axios
        .get(`${apiUrl}/All/${lectureId}`);
}

const getById = async (resourceId) => {
    return await axios
        .get(`${apiUrl}/${resourceId}`);
}

const create = async (resourceData) => {
    return await axios
        .post(`${apiUrl}`, resourceData, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmYzVhNThjYS1mYmMzLTRjYTYtYTk1My1iNjg4YmU4NTdlN2QiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHRlc3QudGVzdCIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjQ1MDQwNTc4LCJleHAiOjE2NDUyOTk3NzgsImlhdCI6MTY0NTA0MDU3OH0.2FcWBguW2llwBG5TeiZtOHIi5WExsovQwnQG5zfyHY8',
            },
        });
}

const update = async (resourceId, resourceData) => {
    return await axios
        .put(`${apiUrl}/${resourceId}`, resourceData, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmYzVhNThjYS1mYmMzLTRjYTYtYTk1My1iNjg4YmU4NTdlN2QiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHRlc3QudGVzdCIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjQ1MDQwNTc4LCJleHAiOjE2NDUyOTk3NzgsImlhdCI6MTY0NTA0MDU3OH0.2FcWBguW2llwBG5TeiZtOHIi5WExsovQwnQG5zfyHY8',
            },
        });
}

const deleteResource = async (resourceId) => {
    return await axios
        .delete(`${apiUrl}/${resourceId}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmYzVhNThjYS1mYmMzLTRjYTYtYTk1My1iNjg4YmU4NTdlN2QiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHRlc3QudGVzdCIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjQ1MDQwNTc4LCJleHAiOjE2NDUyOTk3NzgsImlhdCI6MTY0NTA0MDU3OH0.2FcWBguW2llwBG5TeiZtOHIi5WExsovQwnQG5zfyHY8',
            }
        });
}

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    let response = await axios({
        method: 'POST',
        url: baseUrl + "api/Blobs/upload",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', }
    });

    return response.data;
}

const deleteFile = async (blobName) => {
    const formData = new FormData();
    formData.blobName = blobName;

    let response = await axios({
        method: 'DELETE',
        url: baseUrl + "api/Blobs/delete", formData,
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmYzVhNThjYS1mYmMzLTRjYTYtYTk1My1iNjg4YmU4NTdlN2QiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHRlc3QudGVzdCIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjQ1MDQwNTc4LCJleHAiOjE2NDUyOTk3NzgsImlhdCI6MTY0NTA0MDU3OH0.2FcWBguW2llwBG5TeiZtOHIi5WExsovQwnQG5zfyHY8',
            'Content-Type': 'multipart/form-data',
        },
    });

    return response;
}

export const resourceService = {
    getAll,
    getById,
    create,
    update,
    deleteResource,
    uploadFile,
    deleteFile,
}
