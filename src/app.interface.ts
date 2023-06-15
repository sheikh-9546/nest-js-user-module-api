export interface MessageInterface {
    field: string;
    message?: string;
}

export interface SuccessResponseInterface<T> {
    readonly data: T;
    readonly options?: {
        readonly paginationParams: PaginationParamsInterface;
        readonly totalCount: number;
    };
}

export type Mutable<Type> = {
    -readonly [Key in keyof Type]: Type[Key];
};

export interface PaginationParamsInterface {
    readonly page: number;
    readonly limit?: number;
}

export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    NON_BINARY = 'Non-binary',
}

export enum Screen {
    LICENSE_TYPE = 'LICENSE_TYPE',
    LICENSE_TYPE_REFRENCE = 'LICENSE_TYPE_REFRENCE',
}

export enum UniqueIdPrefix {
    PROVIDER_PREFIX = 'TCP',
    PATIENT_PREFIX = 'TC',
    TRANSACTION_PREFIX = 'TCT',
}

export enum VerificationProvider {
    RESET_PASSWORD = 'thrive_reset',
    VERIFY_EMAIL = 'thrive_verify',
}

export enum LeadProvider {
    LEAD_APPROVED = 'Lead Approved',
}

export enum SessionTypes {
    IN_PERSON = 'IN_PERSON',
    VIRTUAL = 'VIRTUAL',
}

export enum CountryCode {
    US = '1',
    IN = '91',
}

export enum EmailTemplates {
    LEAD_CREATION_USER_NOTIFICATION_TEMPLATE_ID = 1,
    LEAD_APPROVAL_NOTIFICATION_TEMPLATE_ID = 2,
    LEAD_REJECTION_NOTIFICATION_TEMPLATE_ID = 3,
    FORGET_PASSWORD_OTP_TEMPLATE_ID = 4,
    PROVIDER_PROFILE_UPDATE_FOR_ADMIN_TEMPLATE_ID = 6,
    PROVIDER_PROFILE_UPDATE_FOR_PROVIDER_TEMPLATE_ID = 5,
}

export const JWT_AUTH_GUARD = 'jwt';
export const LOCAL_AUTH_GUARD = 'local';
export const JWT_BEARER = 'bearer';
export const API_KEY = 'x-api-key';

export const BULL_CONFIG = 'bull-config';
export const NOTIFICATION_QUEUE = 'NOTIFICATION_QUEUE';

export enum ErrorCode {
    LOGIN_CREDENTIAL_MESSAGE = 'Invalid user credentials, please provide valid user credential',
    TOO_MANY_REQUEST_MESSAGE = 'Too many request. Your requests are temporarily blocked',
    EMAIL_EXISTS_MESSAGE = 'User email address already exists.',
    EMAIL_ALREADY_VERIFIED_MESSAGE = 'Email address already verified',
    PHONE_EXISTS_MESSAGE = 'Provided phone already exists.',
    INVALID_USER_CREDENTIAL_MESSAGE = 'The email is not registered',
    VALIDATION_ERROR_MESSAGE = 'Please corrected the following error message.',
    PASSWORD_OR_CONFIRMATION_PASSWORD_ERROR_MESSAGE = 'Password and confirm password does not match.',
    PASSWORD_ALREADY_SET_FOR_PROVIDER_MESSAGE = 'Password already set for the provider',
    EMAIL_NOT_FOUND_MESSAGE = 'Provided email address does not exists.',
    USER_NOT_FOUND_MESSAGE = 'User not found.',
    USER_CREATION_ERROR_MESSAGE = 'Unable to create user, please try later.',
    USER_EMAIL_NOT_FOUND_MESSAGE = 'No user found associated with email',
    USER_TYPE_INVALID_MESSAGE = 'Provided user is not a provider',
    INVALID_USER_PASSWORD_MESSAGE = 'Please provide the valid password',
    INVALID_PHONE_NUMBER_MESSAGE = 'Provide a valid phone number',
    INVALID_COUNTRY_CODE_MESSAGE = 'Provided country code is not supported',
    LEAD_CREATION_ERROR_MESSAGE = 'Unable to submit provider request form, please try later',
    LEAD_DEGREE_CREATION_ERROR_MESSAGE = 'Unable to add degrees for a lead',
    INVALID_LICENSE_TYPE_ERROR_MESSAGE = 'Invalid license type id',
    INVALID_STATE_ERROR_MESSAGE = 'Invalid state id ',

    APPOINTMENT_ALREADY_BOOKED = 'An appointment already booked for the same date and time',
    SPECIALTY_NOT_FOUND_MESSAGE = 'Specialty not found.',
    SPECIALTY_ALREADY_EXISTS_MESSAGE = 'Specialty already exists.',
    DEGREE_NOT_FOUND_MESSAGE = 'Degree not found.',
    DEGREE_ALREADY_EXISTS_MESSAGE = 'Degree already exists.',
    INVALID_OTP_MESSAGE = 'Invalid Otp!',
    AVATAR_NOT_EXIST_MESSAGE = 'Please provide a valid avatar id',
    PREVIOUS_STEP_INCOMPLETE_MESSAGE = 'Before choosing a plan, please complete the previous steps',
    STATE_PREFERENCE_NOT_FOUND_MESSAGE = 'Providers state preference not found',
    INVALID_PROVIDER_TOKEN_MESSAGE = 'Invalid provider token!',
    INVALID_DOB_MESSAGE = 'Invalid date of birth!',
    USER_NOT_A_PROVIDER_MESSAGE = 'Requested user not a valid provider.',
    ATTACHMENT_MAX_LIMIT_REACHED = 'Attachment max limit reached.',
    ATTACHMENT_NOT_ALLOWED_MESSAGE = 'Provided attachment is not allowed.',
    ATTACHMENT_ALREADY_EXIST_MESSAGE = 'Provided attachment is already exist into the system',
    CAN_NOT_CREATE_SLOTS_MESSAGE = 'Sorry! you can not create the slot',
    MODALITY_PREFERENCES_NOT_FOUND_MESSAGE = 'Modality preferences not found!',
    PROVIDER_PROVIDER_NOT_APPROVED = 'Provider profile not approved!',
    HEALTH_INSURANCE_NOT_FOUND = 'Health insurance not found!',
    CARD_NOT_ADDED = 'User Card is not added!',
    DUPLICATE_CARD_ADDED = 'Duplicate card!, same card is already added',
}
