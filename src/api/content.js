import request from "@/plugins/axios";
function insertContentItem() {}
function insertContentList() {}
function deleteContentItem() {}
function deleteContentList() {}
function updateContentItem() {}
function updateContentList() {}
export const selectContentList = (data) =>
  request({
    url: "/api/webstack/content/list",
    method: "post",
    data,
  });
