# Models reference

## CourseDTO

_Object containing the following properties:_

| Property               | Type                                                |
| :--------------------- | :-------------------------------------------------- |
| **`id`** (\*)          | `number` (_≥-2147483648, ≤2147483647_)              |
| **`title`** (\*)       | `string` (_max length: 200_)                        |
| **`description`** (\*) | `string` (_nullable_)                               |
| **`teacherId`** (\*)   | `number` (_≥-2147483648, ≤2147483647_)              |
| **`gradeId`** (\*)     | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |
| **`isActive`** (\*)    | `boolean` (_nullable_)                              |
| **`createdAt`** (\*)   | `Date` (_nullable_)                                 |

_(\*) Required._

## CreateCourseDTO

_Object containing the following properties:_

| Property               | Type                                                |
| :--------------------- | :-------------------------------------------------- |
| **`title`** (\*)       | `string` (_max length: 200_)                        |
| **`description`** (\*) | `string` (_nullable_)                               |
| **`teacherId`** (\*)   | `number` (_≥-2147483648, ≤2147483647_)              |
| **`gradeId`** (\*)     | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |
| **`isActive`** (\*)    | `boolean` (_nullable_)                              |

_(\*) Required._

## CreateFaqFolderDTO

_Object containing the following properties:_

| Property         | Type                                                |
| :--------------- | :-------------------------------------------------- |
| **`title`** (\*) | `string` (_max length: 200_)                        |
| **`order`** (\*) | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## CreateFaqQuestionDTO

_Object containing the following properties:_

| Property            | Type                                                |
| :------------------ | :-------------------------------------------------- |
| **`folderId`** (\*) | `number` (_≥-2147483648, ≤2147483647_)              |
| **`question`** (\*) | `string`                                            |
| **`answer`** (\*)   | `string` (_nullable_)                               |
| **`tags`** (\*)     | `Array<string>` (_nullable_)                        |
| **`views`** (\*)    | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## CreateGradeDTO

_Object containing the following properties:_

| Property                  | Type                         |
| :------------------------ | :--------------------------- |
| **`name`** (\*)           | `string` (_max length: 100_) |
| **`specialization`** (\*) | `string` (_max length: 100_) |
| **`year`** (\*)           | `number` (_≥-32768, ≤32767_) |
| **`isActive`** (\*)       | `boolean` (_nullable_)       |

_(\*) Required._

## CreateLessonDTO

_Object containing the following properties:_

| Property            | Type                                                |
| :------------------ | :-------------------------------------------------- |
| **`courseId`** (\*) | `number` (_≥-2147483648, ≤2147483647_)              |
| **`title`** (\*)    | `string` (_max length: 200_)                        |
| **`order`** (\*)    | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## CreateQuizDTO

_Object containing the following properties:_

| Property             | Type                                                                                    |
| :------------------- | :-------------------------------------------------------------------------------------- |
| **`lessonId`** (\*)  | `number` (_≥-2147483648, ≤2147483647_)                                                  |
| **`title`** (\*)     | `string` (_max length: 200_)                                                            |
| **`questions`** (\*) | `string \| number \| boolean \| null \| Record<string, any> \| Array<any>` (_nullable_) |

_(\*) Required._

## CreateStaffDTO

_Object containing the following properties:_

| Property               | Type                                      |
| :--------------------- | :---------------------------------------- |
| **`fullName`** (\*)    | `string` (_max length: 150_)              |
| **`email`** (\*)       | `string` (_max length: 150_)              |
| **`phoneNumber`** (\*) | `string` (_max length: 50_) (_nullable_)  |
| **`password`** (\*)    | `string`                                  |
| **`role`** (\*)        | `'teacher' \| 'support_agent' \| 'admin'` |

_(\*) Required._

## CreateStudentDTO

_Object containing the following properties:_

| Property                 | Type                                                |
| :----------------------- | :-------------------------------------------------- |
| **`fullName`** (\*)      | `string` (_max length: 150_)                        |
| **`email`** (\*)         | `string` (_max length: 150_)                        |
| **`studentNumber`** (\*) | `string` (_max length: 50_)                         |
| **`parentNumber`** (\*)  | `string` (_max length: 50_)                         |
| **`country`** (\*)       | `string` (_max length: 100_)                        |
| **`city`** (\*)          | `string` (_max length: 100_)                        |
| **`gradeId`** (\*)       | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## FaqFolderDTO

_Object containing the following properties:_

| Property         | Type                                                |
| :--------------- | :-------------------------------------------------- |
| **`id`** (\*)    | `number` (_≥-2147483648, ≤2147483647_)              |
| **`title`** (\*) | `string` (_max length: 200_)                        |
| **`order`** (\*) | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## FaqQuestionDTO

_Object containing the following properties:_

| Property            | Type                                                |
| :------------------ | :-------------------------------------------------- |
| **`id`** (\*)       | `number` (_≥-2147483648, ≤2147483647_)              |
| **`folderId`** (\*) | `number` (_≥-2147483648, ≤2147483647_)              |
| **`question`** (\*) | `string`                                            |
| **`answer`** (\*)   | `string` (_nullable_)                               |
| **`tags`** (\*)     | `Array<string>` (_nullable_)                        |
| **`views`** (\*)    | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_(\*) Required._

## GradeDTO

_Object containing the following properties:_

| Property                  | Type                                   |
| :------------------------ | :------------------------------------- |
| **`id`** (\*)             | `number` (_≥-2147483648, ≤2147483647_) |
| **`name`** (\*)           | `string` (_max length: 100_)           |
| **`specialization`** (\*) | `string` (_max length: 100_)           |
| **`year`** (\*)           | `number` (_≥-32768, ≤32767_)           |
| **`isActive`** (\*)       | `boolean` (_nullable_)                 |
| **`createdAt`** (\*)      | `Date` (_nullable_)                    |
| **`updatedAt`** (\*)      | `Date` (_nullable_)                    |

_(\*) Required._

## LessonDTO

_Object containing the following properties:_

| Property             | Type                                                |
| :------------------- | :-------------------------------------------------- |
| **`id`** (\*)        | `number` (_≥-2147483648, ≤2147483647_)              |
| **`courseId`** (\*)  | `number` (_≥-2147483648, ≤2147483647_)              |
| **`title`** (\*)     | `string` (_max length: 200_)                        |
| **`order`** (\*)     | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |
| **`createdAt`** (\*) | `Date` (_nullable_)                                 |

_(\*) Required._

## QuizDTO

_Object containing the following properties:_

| Property             | Type                                                                                    |
| :------------------- | :-------------------------------------------------------------------------------------- |
| **`id`** (\*)        | `number` (_≥-2147483648, ≤2147483647_)                                                  |
| **`lessonId`** (\*)  | `number` (_≥-2147483648, ≤2147483647_)                                                  |
| **`title`** (\*)     | `string` (_max length: 200_)                                                            |
| **`questions`** (\*) | `string \| number \| boolean \| null \| Record<string, any> \| Array<any>` (_nullable_) |

_(\*) Required._

## StaffDTO

_Object containing the following properties:_

| Property               | Type                                      |
| :--------------------- | :---------------------------------------- |
| **`id`** (\*)          | `number` (_≥-2147483648, ≤2147483647_)    |
| **`fullName`** (\*)    | `string` (_max length: 150_)              |
| **`email`** (\*)       | `string` (_max length: 150_)              |
| **`phoneNumber`** (\*) | `string` (_max length: 50_) (_nullable_)  |
| **`password`** (\*)    | `string`                                  |
| **`role`** (\*)        | `'teacher' \| 'support_agent' \| 'admin'` |
| **`createdAt`** (\*)   | `Date` (_nullable_)                       |

_(\*) Required._

## StudentDTO

_Object containing the following properties:_

| Property                 | Type                                                |
| :----------------------- | :-------------------------------------------------- |
| **`id`** (\*)            | `number` (_≥-2147483648, ≤2147483647_)              |
| **`fullName`** (\*)      | `string` (_max length: 150_)                        |
| **`email`** (\*)         | `string` (_max length: 150_)                        |
| **`studentNumber`** (\*) | `string` (_max length: 50_)                         |
| **`parentNumber`** (\*)  | `string` (_max length: 50_)                         |
| **`country`** (\*)       | `string` (_max length: 100_)                        |
| **`city`** (\*)          | `string` (_max length: 100_)                        |
| **`gradeId`** (\*)       | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |
| **`createdAt`** (\*)     | `Date`                                              |
| **`updatedAt`** (\*)     | `Date`                                              |

_(\*) Required._

## UpdateCourseDTO

_Object containing the following properties:_

| Property      | Type                                                |
| :------------ | :-------------------------------------------------- |
| `title`       | `string` (_max length: 200_)                        |
| `description` | `string` (_nullable_)                               |
| `teacherId`   | `number` (_≥-2147483648, ≤2147483647_)              |
| `gradeId`     | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |
| `isActive`    | `boolean` (_nullable_)                              |

_All properties are optional._

## UpdateFaqFolderDTO

_Object containing the following properties:_

| Property | Type                                                |
| :------- | :-------------------------------------------------- |
| `title`  | `string` (_max length: 200_)                        |
| `order`  | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_All properties are optional._

## UpdateFaqQuestionDTO

_Object containing the following properties:_

| Property   | Type                                                |
| :--------- | :-------------------------------------------------- |
| `folderId` | `number` (_≥-2147483648, ≤2147483647_)              |
| `question` | `string`                                            |
| `answer`   | `string` (_nullable_)                               |
| `tags`     | `Array<string>` (_nullable_)                        |
| `views`    | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_All properties are optional._

## UpdateGradeDTO

_Object containing the following properties:_

| Property         | Type                         |
| :--------------- | :--------------------------- |
| `name`           | `string` (_max length: 100_) |
| `specialization` | `string` (_max length: 100_) |
| `year`           | `number` (_≥-32768, ≤32767_) |
| `isActive`       | `boolean` (_nullable_)       |

_All properties are optional._

## UpdateLessonDTO

_Object containing the following properties:_

| Property   | Type                                                |
| :--------- | :-------------------------------------------------- |
| `courseId` | `number` (_≥-2147483648, ≤2147483647_)              |
| `title`    | `string` (_max length: 200_)                        |
| `order`    | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_All properties are optional._

## UpdateQuizDTO

_Object containing the following properties:_

| Property    | Type                                                                                    |
| :---------- | :-------------------------------------------------------------------------------------- |
| `lessonId`  | `number` (_≥-2147483648, ≤2147483647_)                                                  |
| `title`     | `string` (_max length: 200_)                                                            |
| `questions` | `string \| number \| boolean \| null \| Record<string, any> \| Array<any>` (_nullable_) |

_All properties are optional._

## UpdateStaffDTO

_Object containing the following properties:_

| Property      | Type                                      |
| :------------ | :---------------------------------------- |
| `fullName`    | `string` (_max length: 150_)              |
| `email`       | `string` (_max length: 150_)              |
| `phoneNumber` | `string` (_max length: 50_) (_nullable_)  |
| `password`    | `string`                                  |
| `role`        | `'teacher' \| 'support_agent' \| 'admin'` |

_All properties are optional._

## UpdateStudentDTO

_Object containing the following properties:_

| Property        | Type                                                |
| :-------------- | :-------------------------------------------------- |
| `fullName`      | `string` (_max length: 150_)                        |
| `email`         | `string` (_max length: 150_)                        |
| `studentNumber` | `string` (_max length: 50_)                         |
| `parentNumber`  | `string` (_max length: 50_)                         |
| `country`       | `string` (_max length: 100_)                        |
| `city`          | `string` (_max length: 100_)                        |
| `gradeId`       | `number` (_≥-2147483648, ≤2147483647_) (_nullable_) |

_All properties are optional._
