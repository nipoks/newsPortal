import { useEffect, useState } from "react"
import ProfileHeader from "../ProfileHeader/ProfileHeader"
import { FrontendApi, Configuration } from "@ory/client"
import { Header } from "../../components/header/Header"
import {Content, JSONContent} from '@tiptap/react'
import { MinimalTiptapThree } from "../../components/minimal-tiptap/custom/minimal-tiptap-three"
import '@/components/minimal-tiptap/styles/index.css'
import {TextArea, Label} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

import {useToaster} from '@gravity-ui/uikit';
import './ProfilePage.css'
import {Button} from '@gravity-ui/uikit'
import {Dialog, LinearProgress} from "@mui/material";
import { Button as Button2 }  from "@mui/material";
import {uploadImage} from "../../api/images/images.requests";
import {Footer} from "../../components/footer/Footer";
import {getTopics} from "../../api/topics/topics.requests";
import {TopicOutput} from "../../api/topics/topics.types";
import {CreatePostInput} from "../../api/posts/posts.types";
import {createPost} from "../../api/posts/posts.requests";

const basePath = import.meta.env.VITE_IS_DEV === "true"
    ? "http://localhost:4000"
    : "https:/*";

const ory = new FrontendApi(
    new Configuration({
      basePath,
      baseOptions: { withCredentials: true },
    })
);


export type Tweet = {
  id: number;
  author: string | null;
  date: string;
  content:  string | JSONContent | JSONContent[];
  reactions: {
    like: number;
    dislike: number;
    love: number;
  };
  comments: { author: string; content: string }[];
}

const ProfilePage = () => {
  const {add} = useToaster();

  const [username, setUsername] = useState<string | null>();
  const [userBio, setUserBio] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState<string | null>();

  //Создание поста
  const [value, setValue] = useState<Content>()


  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isModalPostOpen, setIsModalPostOpen] = useState(false);
  const [selectedFilePost, setSelectedFilePost] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploadingImgPost, setIsUploadingImgPost] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [arrayTopics, setArrayTopics] = useState<TopicOutput[]>([]);

  const handleImagePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFilePost(file);
      setPreview(URL.createObjectURL(file)); // Генерация URL для предпросмотра
    }
  };
  const uploadImgPost = async () => {
    if (!selectedFilePost) return;

    setIsUploadingImgPost(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFilePost);

      const response = await uploadImage(formData)

      setUploadedImageUrl(response.Url); // 👈 Сохраняем загруженный URL
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setIsUploadingImgPost(false);
      setIsModalPostOpen(false);
      setUploadProgress(0);
      setSelectedFilePost(null);
    }
  };

  const fetchTopics = async () => {
    try {
      console.log("Fetching Topics");
      const response = await getTopics()

      const mappedTopics: TopicOutput[] = response.map((post: TopicOutput) => ({
        HeaderImageUrl: post.HeaderImageUrl,
        Name: post.Name,
        }));
      setArrayTopics(mappedTopics);
    } catch (error) {
      console.error("Ошибка при загрузке топиков:", error);
    }
  }

  useEffect(() => {

    const fetchSession = async () => {
      try {
        const { data } = await ory.toSession();
        setUsername(data.identity?.traits.email);
        const logoutFlow = await ory.createBrowserLogoutFlow();
        setLogoutUrl(logoutFlow.data.logout_url);
      } catch (err: any) {
        console.error("Ошибка получения сессии:", err);
        setIsEditorVisible(false)
        if (err.response?.status === 401) {
          window.location.href = import.meta.env.VITE_IS_DEV === "true"
              ? "http://localhost:4000/ui/login"
              : "https://*/login";
        }
      }
    };
    fetchSession();
    fetchTopics();
  }, []);

  const handleUpdateTweets = (updatedTweets: Tweet[]) => {
    setTweets(updatedTweets);
  };

  const handleNewPost = async (tweet: Content | undefined) => {
    if (!tweet || !uploadedImageUrl) { //TODO || !topic
      add({
        name: "Validation error",
        title: 'Fill in all the fields',
        theme: "warning",
      });
      return;
    }

    const newPost : CreatePostInput = {
      AuthorEmail: username!,
      content: tweet,
      PreviewImageUrl: uploadedImageUrl,
      Title: title,
      Topic: topic!
    };

    try {
      const response = await createPost(newPost)
      add({
        name: "PostCreated",
        title: 'Post successfully created',
        theme: "success",
      });

    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
  }


  const handleViewCreator = () => {
    setIsEditorVisible(!isEditorVisible);
  }

  const handleUploadPostPreviewImage = () => {
    setIsModalPostOpen(true)
  }

  const onUpdateTopic = (value: string[])  => {
    if (value.length !== 0) {
      setTopic(value[0]);
    }
  }

  if (!username) return null;

  return (
      <>
        <Header hrefLogout={logoutUrl}/>
        <div className={'container-profile-page'}>
          <ProfileHeader username={username} userBio={userBio} />
          {/*<TweetEditor author={username} date={currentDate} onPostTweet={handleNewTweet} />*/}
          <div className={'editor-container'}>
            <Button view={"outlined-action"} onClick={handleViewCreator}>
              {isEditorVisible ? 'Скрыть редактор' : 'Показать редактор'}
            </Button>
            {/* Условный рендеринг: если редактор виден, показываем его */}
            {isEditorVisible && (
                <>
                  <Label>
                    Title
                  </Label>
                  <TextArea
                      view="normal"
                      maxRows={3}
                      value={title} // Устанавливаем текущее значение
                      onChange={(event) => {
                        const newValue = event.target.value;
                        if (newValue.length <= 150) { // Ограничение на 100 символов
                          setTitle(newValue);
                        }
                      }}             />

                  <Select filterable={true} onUpdate={(value: string[]) => onUpdateTopic(value)} >
                    {arrayTopics.map((topic : any) => (
                        <Select.Option key={topic.Name} value={topic.Name}> {topic.Name} </Select.Option>
                    ))}
                  </Select>

                  <MinimalTiptapThree
                      value={value}
                      throttleDelay={10}
                      className="h-full min-h-56 w-full rounded-xl"
                      editorContentClassName="overflow-auto h-full"
                      output="html"
                      onChange={(value) => setValue(value)}
                      placeholder="Text..."
                      editable={true}
                      editorClassName="focus:outline-none px-5 py-4 h-full"
                  />
                  <Button view={"action"} width={"max"} onClick={() => handleUploadPostPreviewImage()}>
                    Add preview image
                  </Button>

                  {/* Если изображение загружено, показываем его */}
                  {uploadedImageUrl && (
                      <div style={{ marginTop: 10 }}>
                        <img src={uploadedImageUrl} alt="Uploaded Preview" style={{ width: 150, height: "auto", borderRadius: 5 }} />
                      </div>
                  )}


                  <Dialog open={isModalPostOpen} onClose={() => setIsModalPostOpen(false)}>
                    <div style={{ padding: 20 }}>
                      <h2>Upload Image</h2>
                      <input type="file" onChange={handleImagePostChange} accept="image/*" />
                      {isUploadingImgPost && <LinearProgress value={uploadProgress} variant="determinate" />}
                      <div style={{ marginTop: 10 }}>
                        <Button2 onClick={uploadImgPost} disabled={isUploadingImgPost}>Upload</Button2>
                        <Button2 onClick={() => setIsModalPostOpen(false)}>Cancel</Button2>
                      </div>
                    </div>
                  </Dialog>



                  <Button view={"action"} width={"max"} onClick={() => handleNewPost(value)}>
                    Create
                  </Button>
                </>
            )}
          </div>
        </div>
        <Footer />
      </>

  );
};

export default ProfilePage;
