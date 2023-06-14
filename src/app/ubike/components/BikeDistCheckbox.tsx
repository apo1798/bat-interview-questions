import { ChangeEvent } from 'react';
import { FaCheck } from 'react-icons/fa';

type Props = {
  checked: boolean;
  labelText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const BikeDistCheckbox = ({ checked, labelText, onChange }: Props) => {
  return (
    <label className='inline-flex items-center gap-4'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='peer hidden'
      />
      <span
        className='relative -z-10 inline-flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-slate-400 peer-checked:border-none peer-checked:bg-lime-500
       '
      >
        <FaCheck className='h-2.5 w-2.5 text-white' />
      </span>
      {labelText}
    </label>
  );
};
export default BikeDistCheckbox;
