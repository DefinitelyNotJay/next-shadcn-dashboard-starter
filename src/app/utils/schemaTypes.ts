// adonis_schema
export type AdonisSchema = {
  id: number;
  name: string;
  batch: number;
  migration_time: string | null; // timestamp
};

// adonis_schema_versions
export type AdonisSchemaVersions = {
  version: number;
};

// categories
export type Category = {
  id: number;
  title: string | null;
  title_th: string | null;
  short_description: string | null;
  short_description_th: string | null;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
  is_visible: boolean; // tinyint(1)
};

// certificate_templates
export type CertificateTemplate = {
  id: number;
  name: string;
  description: string | null;
  template_file: string;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};

// files
export type File = {
  id: number;
  title: string;
  path: string;
  type: FileType; // enum
  size: number;
  order: number;
  status: string | null;
  is_active: boolean;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};

export enum FileType {
  DOCX = 'docx',
  PDF = 'pdf',
  IMAGE = 'image',
  VIDEO = 'video',
  POST = 'post',
  LINK = 'link',
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz'
}

// instructors
export type Instructor = {
  id: number;
  full_name: string;
  first_name: string | null;
  last_name: string | null;
  first_name_th: string | null;
  last_name_th: string | null;
  description: string | null;
  description_th: string | null;
  profile_image: string | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
  position: string | null;
  position_th: string | null;
  order: number;
  is_visible: boolean; // tinyint(1)
};

// profiles
export type Profile = {
  id: number;
  created_at: string | null; // timestamp
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  bio: string | null;
  updated_at: string | null; // timestamp
  major: string | null;
  track: string | null;
};

// users
export type User = {
  id: number;
  email: string;
  username: string | null;
  password: string;
  prefix: string | null;
  first_name: string;
  last_name: string;
  prefix_th: string | null;
  first_name_th: string | null;
  last_name_th: string | null;
  phone_number: string | null;
  google_id: string | null;
  profile_image: string | null;
  remember_me_token: string | null;
  reset_password_token: string | null;
  role_id: number | null;
  is_itkmitl: boolean | null;
  reset_password_token_at: string | null; // datetime (ISO string)
  created_at: string; // ISO string (timestamp)
  updated_at: string; // ISO string (timestamp)
  role: string | null;
  fullname: string | null;
  courseAttendants: Array<{
    name: string;
    status: string;
  }>;
};

// api_tokens
export type ApiToken = {
  id: number;
  user_id: number | null;
  name: string;
  type: string;
  token: string;
  expires_at: string | null; // timestamp
  created_at: string; // timestamp
};

// courses
export type Course = {
  id: number;
  title: string;
  description: string | null;
  price: number;
  max_students: number | null;
  status: string;
  poster_image: string | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
  organization: string | null;
  is_published: boolean; // tinyint(1)
  is_public: boolean;
  access_code: string | null;
  instructors: Instructor[] | null;
  enroll_count: number;
  resources: File[];
};

export enum majorCourse {
  IT = 'it',
  DSBA = 'dsba',
  AIT = 'ait'
}

// courses_instructors
export type CourseInstructor = {
  id: number;
  course_id: number | null;
  instructor_id: number | null;
};

// entity_files
export type EntityFile = {
  id: number;
  file_id: number;
  entity_type:
    | 'course'
    | 'topic'
    | 'assignment'
    | 'submission'
    | 'quiz_question'; // enum
  entity_id: number;
  order: number;
  file: File | null;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};

// interests
export type Interest = {
  id: number;
  user_id: number;
  category_id: number;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};

// topics
export type Topic = {
  id: number;
  title: string;
  order: number;
  resources: File[];
  course_id: number;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};

// purchases
export type Purchase = {
  id: number;
  user_id: number;
  course_id: number;
  status: 'wait' | 'paid' | 'cancel' | 'failed'; // enum
  amount: number;
  is_approved: boolean; // tinyint(1)
  approved_byFile: string | null;
  approved_at: string | null; // datetime
  approved_by_user_id: number | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
  payment_method: string;
  gb_pay_ref_no: string | null;
  reference_no: string | null;
  transaction_body: any; // JSON
  gb_barcode: string | null;
};

// resource_groups
export type ResourceGroup = {
  id: number;
  course_id: number | null;
  instructor_id: number | null;
  title: string;
  short_description: string | null;
  description: string | null;
  is_free_trial: boolean; // tinyint(1)
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
  order: number;
  is_available: boolean; // tinyint(1)
};

// resources
export type Resource = {
  id: number;
  resource_group_id: number | null;
  order: number;
  title: string;
  description: string | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
};

// reviews
export type Review = {
  id: number;
  course_id: number | null;
  name: string;
  review: string | null;
  score: number | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
};

// assignments
export type Assignment = {
  id: number;
  title: string;
  description: string;
  due_date: string | null; // datetime
  is_allow_late: boolean; // tinyint(1)
  max_score: number;
  max_rubric_score: number | null;
  topic_id: number;
  order: number;
  files: File[];
  clos: Clo[];
  assigner: Assigner;
  created_at: string; // timestamp
  updated_at: string; // timestamp
};

export type Assigner = {
  full_name: string;
  profile_image: string;
  role: string;
};

// certificates
export type Certificate = {
  id: string | null;
  user_id: number;
  course_id: number;
  base_file_name: string | null;
  image_file: string | null;
  pdf_file: string | null;
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
};

// clos
export type Clo = {
  id: number;
  title: string;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
  course_id: number | null;
  rubric_scores: RubricScore[];
};

// course_progresses
export type CourseProgress = {
  id: number;
  user_id: number;
  resource_group_id: number;
  is_done: boolean; // tinyint(1)
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
};

// course_questionnaires
export type CourseQuestionnaire = {
  id: number;
  user_id: number;
  course_id: number;
  answer: any; // JSON
  created_at: string; // timestamp
  updated_at: string | null; // timestamp
  allow_usage: boolean; // tinyint(1)
  allow_name_usage: boolean; // tinyint(1)
};

export type CourseRating = {
  id: number;
  user_id: number;
  course_id: number;
  rating: number;
  review: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Enroll = {
  id: number;
  user_id: number;
  course_id: number;
  purchase_id: number | null;
  is_passed: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type PaymentTransaction = {
  id: number;
  purchase_id: number | null;
  amount: number;
  is_approved: boolean;
  approved_by: string | null;
  approved_user_id: number | null;
  approved_at: string | null;
  payment_slip: string | null;
  payment_attributes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Quiz = {
  id: number;
  title: string;
  description: string | null;
  max_score: number;
  topic_id: number;
  is_active: boolean;
  end_time: string;
  created_at: string;
  updated_at: string;
  questions: QuizQuestion[];
};

export enum QuizQuestionTypeEnum {
  MULTIPLE_CHOICE = 'multiple_choice',
  // SHORT_ANSWER = 'short_answer',
  NUMERAL = 'numeral',
  TRUE_FALSE = 'true_false'
}

export type QuizQuestion = {
  id: number;
  quiz_id: number;
  type: QuizQuestionTypeEnum;
  question: string;
  max_score: number;
  order: number;
  created_at: string;
  updated_at: string;
  choices: QuizChoice[];
  files: EntityFile[];
};

export type RubricScore = {
  id: number;
  title: string;
  description: string | null;
  score: number;
  clo_id: number;
  created_at: string | null;
  updated_at: string | null;
};

export type Section = {
  id: number;
  resource_group_id: number;
  title: string;
  type:
    | 'text'
    | 'quiz'
    | 'video_yt'
    | 'video_streaming_kmitl'
    | 'video_streamable'
    | 'lg_c'
    | null;
  quiz_id: number | null;
  video: string | null;
  description: string | null;
  attachments: string | null;
  meeting_link: string | null;
  order: number;
  is_available: boolean;
  video_qualities: string;
  created_at: string | null;
  updated_at: string | null;
};

export type Submission = {
  id: number;
  assignment_id: number;
  user_id: number;
  rubric_score_id: number | null;
  status: StatusSubmission;
  score: number | null;
  created_at: string | null;
  updated_at: string | null;
  submitted_at: string | null;
  files: File[];
  rubric_score: number;
};

export enum StatusSubmission {
  ASSIGNED = 'assigned',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  LATE = 'late',
  MISSING = 'missing',
  REVISION = 'revision',
  EDITING = 'editing'
}

export type UserWatchedSection = {
  id: number;
  user_id: number | null;
  section_id: number | null;
  last_watched_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CloAssignment = {
  id: number;
  clo_id: number;
  assignment_id: number;
  created_at: string | null;
  updated_at: string | null;
};

export type QuizGrade = {
  id: number;
  is_graded: boolean;
  user_id: number | null;
  quiz_id: number | null;
  is_passed: boolean;
  corrected_questions: number;
  all_questions: number;
  score: number;
  max_score: number;
  submission: string | null;
  remark: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type QuizChoice = {
  id: number;
  quiz_question_id: number | null;
  title: string | null;
  description: string | null;
  is_correct: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CourseWithRelations = Course & {
  topics?: Topic[];
  instructors?: Instructor[];
};

export type EntityFileWithRelations = EntityFile & {
  file?: File;
};

export type rubricScoreWithClos = RubricScore & {
  clo: Clo;
};

export type ContentItemType = EntityFileWithRelations | Assignment;

export type EnrollWithRelations = Enroll & {
  user: User;
  purchase: Purchase;
};

export type SubmissionWithRelations = Submission & {
  assignment: Assignment;
  user: User;
};

export type EnrollWithUser = Enroll & {
  user: User;
};

export type SubmissionWithUser = Submission & {
  user: User;
};

export type CourseWithTopic = Course & {
  topics: Topic[];
};

export type EntityType =
  | 'assignment'
  | 'topic'
  | 'course'
  | 'submission'
  | 'quiz'
  | 'quiz_question';

export type Major = 'it' | 'dsba' | 'ait';

type RubricScoreItem = {
  id: number;
  description: string;
  score: number;
};

export type GroupedRubric = {
  cloTitle: string;
  scores: RubricScoreItem[];
};

// หรือถ้าต้องการให้รองรับอาร์เรย์ของ GroupedRubric

export type Classroom = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Permission = {
  id: number;
  name: string;
  name_th: string;
  created_at: string | null;
  updated_at: string | null;
};

export type Role = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CourseAttendant = {
  id: number;
  course_id: number;
  user_id: number;
  role_id: number;
  status: string;
  last_viewed_at: string;
  user: User;
  role: Role;
  created_at: string;
  updated_at: string;
};

export type CourseAttendantWithUser = CourseAttendant & {
  user: User;
  role: Role;
};
// export type ListStaffsProps =\

export type QuizStatus = 'submitted' | 'not_submitted';

export interface QuizWithStatus {
  id: number;
  title: string;
  max_score: number;
  is_active: boolean;
  status: QuizStatus;
  end_time: string | null;
  total_score: number | null;
  submitted_at: string | null;
  submission_id: number | null;
}

export enum QuizShowMode {
  SCORE = 'score',
  ANSWER = 'answer',
  SOLUTION = 'solution'
}

export interface QuizSubmissionAnswer {
  question_id: number;
  question: string;
  type: QuizQuestionTypeEnum;
  max_score: number;
  is_correct?: boolean;
  score?: number;
  // สำหรับ multiple_choice
  selected_choice_id?: number | null;
  selected_choice?: string | null;
  choices?: { id: number; text: string; is_correct: boolean }[];
  // สำหรับ numeral
  answer_numeric?: number | null;
  expected_numeric?: number | null;
  tolerance?: number | null;
  // สำหรับ true_false
  answer_boolean?: boolean | null;
  expected_boolean?: boolean | null;
  // สำหรับ short_answer
  answer_text?: string | null;
  expected_text?: string | null;
  files: EntityFile[];
}

export interface QuizSubmission {
  id: number;
  total_score: number;
  submitted_at: string;
  show_mode: QuizShowMode;
  answers?: QuizSubmissionAnswer[];
}

export type QuizSubmissionWithQuizSubmissionAnswer = QuizSubmission & {
  answers: QuizSubmissionAnswer[];
  user: User;
  quiz: Quiz;
};
