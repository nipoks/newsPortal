import { useEffect, useState } from "react";
import { Dialog, Button, LinearProgress } from "@mui/material";

import "./ProfileHeader.css"
import { Configuration, FrontendApi } from "@ory/client";
import {getAvatar, postAvatar} from "../../api/users/users.requests";
const basePath = import.meta.env.VITE_IS_DEV === "true"
  ? "http://localhost:4000" 
  : "https://*";

const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: { withCredentials: true },
  })
);

const ProfileHeader = ({ username, userBio }: { username: string; userBio: string }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { data } = await ory.toSession();
        setUserEmail(data.identity?.traits.email);
      } catch (err: any) {
        console.error("Ошибка получения сессии:", err);
      }
    }
    const fetchAvatar = async () => {
      if (!userEmail) return;
      const response = await getAvatar(userEmail);
      setProfileImageUrl(response.Url);
    }

    fetchUserEmail().then(fetchAvatar)
  }, [userEmail]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!selectedFile || !userEmail) return;
    setIsUploading(true);
    setUploadProgress(20);

    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("file", selectedFile);
      const response1 = await postAvatar(formData)
      setProfileImageUrl(response1.Url);
      setUploadProgress(100);
    } catch (error) {
      console.error("Ошибка загрузки аватарки:", error);
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-container">
        <div className="profile-row">
          <div className="image-col">
            <img
              src={profileImageUrl}
              className="rounded-avatar"
              alt="Profile"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="text-col">
            <h1 className="username">{username}</h1>
            {/* <p className="bio">{userBio}</p> */}
          </div>
        </div>
      </div>


      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ padding: 20 }}>
          <h2>Upload Image</h2>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {isUploading && <LinearProgress value={uploadProgress} variant="determinate" />}
          <div style={{ marginTop: 10 }}>
            <Button onClick={uploadAvatar} disabled={isUploading}>Upload</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfileHeader;
