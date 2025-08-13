---
title: Schemas
sidebar_label: Schemas
---

# Schemas

List of all schemas and data structures used throughout the application.

## Path
**Paths** are recommended learning order of courses.
```typescript
{
  id: string,
  name: string,
  description: string, // Short description of the course formatted in markdown
  metadata: MetaData, // Metadata about this path in key-value pairs
  courses: Course[] // ! Only the course id and name is given in the response
}
```

## Course
**Courses** contain multiple modules, can be purchased in one.
```typescript
{
  id: string,
  name: string,
  description: string,
  author: Author, // ! Only the name and id of the author is returned
  metadata: MetaData, // Metadata about this path in key-value pairs
  modules: CourseModule[]
}
```

## Module and CourseModule
- **CourseModules** are modules created for specific courses.
- **Modules** are modules created separate from any courses, however can be linked to courses.
### Modules
**Modules** can contain video lectures, documents, exercises, tests.
```typescript
{
  id: string,
  name: string,
  description: string, // Short description of the module formatted in markdown
  author: Author, // ! Only the name and id of the author is returned
  metadata: MetaData, // Metadata about this module in key-value pairs
  sections: ModuleSection[]
}
```
### ModuleSection
**ModuleSection** are sections of the module. They contain the learning materials, exercises, code tasks.
```typescript
{
  id: string,
  name: string,
  type: ModuleSectionType,
  content: Task, // Varies based on the type.
}
```
### ModuleSectionType
Enum, can have the following values:
| Value | Description |
|-------|-------------|
| VIDEO | Video lecture or screencast 
| DOCUMENT | Written documentation or article, formatted in markdown |
| MULTIP_EXERCISE | Interactive multiple choice exercise |
| CODE_TASK | Programming task or coding challenge |
| TEST | Assessment or quiz |

### Task
The structure of the task varies based on its type. Some examples:
```typescript title="VIDEO"
{
  id: string,
  name: string,
  description: string?, // Optional: markdown formatted description of the task
  url: string, // URL to the video
}
```

```typescript title="DOCUMENT"
{
  id: string,
  name: string,
  description: string?, // Optional: markdown formatted description of the task
  content: string, // Markdown formatted contents
}
```

```typescript title="MULTIP_EXERCISE"
{
  id: string,
  name: string,
  description: string?, // Optional: markdown formatted description of the task
  content: string[], // Available choices
}
```

```typescript title="CODE_TASK"
{
  id: string,
  name: string,
  description: string?, // Optional: markdown formatted description of the task
  content: {
    starterCode: string[] // Optional: Multiple lines of code to be inserted into the editor. 
  },
  sessionId: string, // Unique ID of the session of the websocket
}
```
:::note Code tasks
Please check out the [documentation](../code_tasks) regarding code tasks to understand the response parameters better.
:::

```typescript title="TEST"
{
  id: string,
  name: string,
  description: string?, // Optional: markdown formatted description of the task
  content: Task[], // A list of task exercises.
}
```
:::warning
Note that the test contents cannot contain both code and other types of exercises.
:::

## User
```typescript
{
  id: string,
  username: string,
  email: string,
  metadata: MetaData,
  subTier: SubscriptionTier,
  lastEnrolled: string, // ID of the latest enrolled module / course for the user
}
```
### Author
```typescript
{
  id: string, // ID of the author profile
  userId: string, // Linked to the user profile
  courses: Course[], // List of created courses by the author
  lastEnrolled: string, // ID of the latest enrolled module / course for the user
}
```

### SubscriptionTier
| Value | Description |
|-------|-------------|
|`GUEST`|Users without an account|
|`FREE`|Registered users|
|`PREMIUM`|Premium users with either a subscription or on-demand payment|
| * `ENT`|Enterprise users|
:::warning Enterprise users
\* This feature is set to be developed in the version `v2` of the API. Check the [roadmap](https://roadmap.infoacademy.hu/) for more information.
:::
## MetaData
**MetaData** can contain various data stored in key-value pairs. All of the following is optional.
```typescript
{
  rating: number, // Rating of learning materials in decimals (is between 0-5)
  users: number, // Number of enrolled users into learning materials
  duration: number, // Required time to complete a learning materials, given in minutes
  difficulty: string, // Difficulty of learning materials
  user_streak: number, // Number of consecutive days of completing a task per user
}
```

