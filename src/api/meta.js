import request from "@/plugins/axios";
function insertMetaItem() {}
function insertMetaList() {}
function deleteMetaItem() {}
function deleteMetaList() {}
function updateMetaItem() {}
function updateMetaList() {}
export const selectMetaList = (data) =>
  request({
    url: "/api/webstack/meta/list",
    method: "post",
    data,
  });

export const selectMetaTree = (data) =>
  request({
    url: "/api/webstack/meta/tree",
    method: "post",
    data,
  });
