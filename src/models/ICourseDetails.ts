import { IAPICourse } from "./IAPICourse";
import { Lesson } from "./Lesson";

export type ICourseDetails = IAPICourse & {
  containsLockedLessons?: boolean;
  previewImageLink?: boolean;
  lessons: Lesson[];
};
