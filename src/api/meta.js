import request from "@/plugins/axios";
function insertMetaItem() {}
function insertMetaList() {}
function deleteMetaItem() {}
function deleteMetaList() {}
function updateMetaItem() {}
function updateMetaList() {}
export const selectMetaList = (data) =>  request({
    url: "/vue-element-webstack/meta/list",
    method: "post",
    data,
  });

export const selectMetaTree = (data) => request({
    url: "/vue-element-webstack/meta/tree",
    method: "post",
    data,
  });
