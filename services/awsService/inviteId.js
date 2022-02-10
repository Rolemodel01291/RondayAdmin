const inviteId = "e5090d10-260b-48e3-8606-5515776af9d2";

export const baseUrl = "https://api.staging.rondayapp.com/";

export const clientUrl = "http://localhost:3000"

export const stagingUrl = "https://my.staging.rondayapp.com"

export const spaceTypeStageUrl = "https://cdn.rondayapp.com/images/shared/img/spaces/"

export const conferenceRoomStageUrl = "https://cdn.rondayapp.com/images/shared";

export const redirectUri = process.env.NODE_ENV === "development" ? "http://localhost:3000/verification" : "https://my.staging.rondayapp.com/verification";

export const inviteLink = "https://my.staging.rondayapp.com/invitation/"

export default inviteId;

