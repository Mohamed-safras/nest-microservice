// import { CourseService } from '../course.service';
// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { getCharacterLengthWithoutTags } from '@app/common';

// @ValidatorConstraint({ name: 'number', async: true })
// @Injectable()
// export class CourseNumbervalidation implements ValidatorConstraintInterface {
//   constructor(private readonly course: CourseService) { }

//   async validate(value: string, args: ValidationArguments): Promise<boolean> {
//     const result = await this.course.findCourseByNumber(value, args.object['_id'])
//     if (result) {
//       return false;
//     }
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `Course Number already exist`;
//   }
// }

// @ValidatorConstraint({ name: 'string', async: false })
// export class CharacterLengthValidation implements ValidatorConstraintInterface {
//   validate(value: string, args: ValidationArguments) {
//     const isLengthExceeded = getCharacterLengthWithoutTags(value)

//     if (!isLengthExceeded) {
//       return false
//     }
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return 'Course description character length should be less than 6000.';
//   }
// }

// @ValidatorConstraint({ name: 'trainingPartnerName', async: true })
// @Injectable()
// export class TrainingPartnervalidation implements ValidatorConstraintInterface {
//   constructor(private readonly course: CourseService) { }

//   async validate(value: string, args: ValidationArguments): Promise<boolean> {
//     const result = await this.course.findTrainingPartnerByName(value)
//     if (result === 0) {
//       return false;
//     }
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `Training Partner does not exist, Please register a new Training Partner`;
//   }
// }