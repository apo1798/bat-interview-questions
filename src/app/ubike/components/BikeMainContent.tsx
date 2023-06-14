'use client';

import BikeDistCheckbox from '@/app/ubike/components/BikeDistCheckbox';
import { Fragment, useMemo, useReducer, useState } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import clsx from 'clsx';
import StationTable from '@/app/ubike/components/StationTable';
import { DebounceInput } from 'react-debounce-input';
import BikeFilterSection from '@/app/ubike/components/BikeFilterSection';

const cities = [
  { id: 'taipei', name: '台北市' },
  { id: 'new-taipei', name: '新北市' },
  { id: 'taoyuan', name: '桃園市' },
  { id: 'hisnchu', name: '新竹縣市' },
  { id: 'miaoli', name: '苗栗縣' },
] as const;

type Props = { data: StationInfo[] };

const BikeMainContent = ({ data }: Props) => {
  const dists: Record<string, boolean> = Object.fromEntries([
    ...new Set(data.map((item) => [[item.sarea], true] as const)),
    ['all', true],
  ]);

  const [selectedDist2, dispatch] = useReducer(reducer, dists);
  const [selectedCity, setSelectedCity] = useState<{
    id: string;
    name: string;
  }>(cities[0]);
  const [searchInput, setSearchInput] = useState('');

  const filteredData = useMemo(() => {
    if (searchInput === '')
      return data.filter((item) => selectedDist2[item.sarea]);

    return data.filter(
      (item) => selectedDist2[item.sarea] && item.sna.includes(searchInput)
    );
  }, [data, selectedDist2, searchInput]);

  return (
    <>
      <BikeFilterSection
        cities={cities}
        selectedDist2={selectedDist2}
        dispatch={dispatch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      {selectedCity.name === '台北市' ? (
        <StationTable data={filteredData} />
      ) : (
        <div className='pt-10'>
          <p className='rounded bg-gray-200 px-8 py-4'>
            本區域尚未支援，目前僅支援「台北市」
          </p>
        </div>
      )}
    </>
  );
};
export default BikeMainContent;

// dists reducer
export type DistSelectActionType =
  | { type: 'all'; payload: { checked: boolean } }
  | { type: 'station'; payload: { name: string; checked: boolean } };

function reducer(
  state: Record<string, boolean>,
  action: DistSelectActionType
): Record<string, boolean> {
  switch (action.type) {
    case 'all': {
      const checked = action.payload.checked;
      if (checked) {
        return Object.fromEntries([
          ...Object.keys(state).map((station) => [station, true]),
          ['all', true],
        ]);
      } else {
        return Object.fromEntries([
          ...Object.keys(state).map((station) => [station, false]),
          ['all', false],
        ]);
      }
    }
    case 'station': {
      const checked = action.payload.checked;
      if (!checked) {
        return { ...state, all: false, [action.payload.name]: checked };
      }
      return { ...state, [action.payload.name]: checked };
    }
    default: {
      return { ...state };
    }
  }
}
