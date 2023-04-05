export type ICourse = {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  imgLink: string;
  rating: number;
  skills: string[];
  link: string;
  courseVideoPreview: {
    link: string;
    duration: number;
    previewImageLink: string;
  };
};
