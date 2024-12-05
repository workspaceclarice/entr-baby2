declare module 'react-datepicker' {
  import { ComponentProps } from 'react';
  
  export interface ReactDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    className?: string;
    placeholderText?: string;
    [key: string]: any;
  }

  const DatePicker: React.FC<ReactDatePickerProps>;
  export default DatePicker;
} 