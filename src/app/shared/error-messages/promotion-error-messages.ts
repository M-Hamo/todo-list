import { ValidatorMessages } from '@shared/helpers/generic-validator';

export const PromotionErrorMessages: ValidatorMessages = {
  fromDate: {
    required: 'From date is required',
    max: 'From date should be less than To date',
  },
  toDate: {
    required: 'To date is required',
    min: 'To date should be grater than From date',
  },
  discountPercentage: {
    min: 'Discount percentage should not be less than 0',
    max: 'Discount percentage should not be grater than 100',
  },
};
