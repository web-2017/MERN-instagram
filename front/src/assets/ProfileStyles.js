import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 932px;
  margin: 0 auto;
`
export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 18px 0;
  border-bottom: 1px solid gray;
`

export const ImageAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`
export const ProfileFollowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 932px;
  margin: 0 auto;
`
export const GalleryItem = styled.img`
  width: 293px;
  height: 293px;
  margin: 30px 0;
`