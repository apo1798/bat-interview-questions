import BikeDistCheckbox from '@/app/ubike/components/BikeDistCheckbox';
import { DistSelectActionType } from '@/app/ubike/components/BikeMainContent';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

type City = { id: string; name: string };

type Props = {
  cities: Readonly<Array<City>>;
  selectedDist2: Record<string, boolean>;
  dispatch: Dispatch<DistSelectActionType>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  selectedCity: City;
  setSelectedCity: Dispatch<SetStateAction<City>>;
};
const BikeFilterSection = ({
  cities,
  selectedDist2,
  dispatch,
  searchInput,
  setSearchInput,
  selectedCity,
  setSelectedCity,
}: Props) => {
  return (
    <div className='space-y-10'>
      <section className='flex flex-col justify-end gap-4 sm:flex-row-reverse'>
        <div className='relative h-full'>
          <DebounceInput
            className='h-full w-full rounded bg-gray-100 px-2 py-1.5 pr-8 text-sm font-medium shadow sm:w-60'
            placeholder='搜尋站點'
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            debounceTimeout={300}
          />
          <button
            type='button'
            className='absolute inset-y-1 right-1 px-1  hover:text-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-1'
          >
            <FaSearch />
          </button>
        </div>
        <div className='relative'>
          <Listbox value={selectedCity} onChange={setSelectedCity}>
            <Listbox.Button className='relative w-full rounded bg-gray-100 py-1.5 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
              <span className='font-medium'>{selectedCity.name}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <FaChevronDown className='h-3 w-3' />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100  py-1 text-base font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:max-w-[16rem]'>
                {cities.map((city) => (
                  <Listbox.Option
                    key={city.id}
                    value={city}
                    className={({ active }) =>
                      clsx(
                        'relative select-none py-2 pl-4 pr-4',
                        active ? 'bg-lime-200 text-lime-900' : 'text-gray-900'
                      )
                    }
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {city.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </section>

      <section className='flex'>
        <ul>
          {'all' in selectedDist2 && (
            <li className='mb-4'>
              <BikeDistCheckbox
                checked={selectedDist2.all}
                labelText='全部勾選'
                onChange={(e) => {
                  dispatch({
                    type: 'all',
                    payload: { checked: e.target.checked },
                  });
                }}
              />
            </li>
          )}
          <ul className='flex flex-wrap gap-x-7 gap-y-4'>
            {Object.entries(selectedDist2).map(([dist, value]) => {
              if (dist === 'all') return null;
              return (
                <li key={dist}>
                  <BikeDistCheckbox
                    checked={value}
                    labelText={dist}
                    onChange={(e) => {
                      dispatch({
                        type: 'station',
                        payload: { name: dist, checked: e.target.checked },
                      });
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </ul>
        <div className='relative hidden flex-shrink-0 basis-7/12 md:block'>
          <Image
            src='/bike.png'
            fill
            className='object-contain'
            alt='riding a bike'
          />
        </div>
      </section>
    </div>
  );
};
export default BikeFilterSection;
