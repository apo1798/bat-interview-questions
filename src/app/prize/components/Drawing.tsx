'use client';
import clsx from 'clsx';
import { useState } from 'react';
// 0 <= x < 1 // Math.random
// 0 - 0.001 => 1
// 0.001 - 0.0301  => 2

const Drawing = () => {
  const [prizes, setPrizes] = useState({
    '1': { chance: 0.001, prizeQty: 0, originalQty: 1 },
    '2': { chance: 0.03, prizeQty: 0, originalQty: 1 },
    '3': { chance: 0.13, prizeQty: 0, originalQty: 3 },
    '4': { chance: 0.18, prizeQty: 0, originalQty: 5 },
    '5': { chance: 0.25, prizeQty: 0, originalQty: 9 },
  });

  const [records, setRecords] = useState<
    (
      | { message: string; type: 'win' }
      | { message: string; type: 'notWin' }
      | { message: string; type: 'noPrize' }
    )[]
  >([]);

  const handleButtonClick = () => {
    let roundPrize = '',
      message = '此次未中獎',
      accChance = 0;
    const randomNumber = Math.random();

    const prizeCopy = structuredClone(prizes);
    const sorted = Object.entries(prizeCopy).sort(([a], [b]) => +a - +b);

    for (const [key, value] of sorted) {
      if (!!roundPrize) break;

      accChance += value.chance;
      const thisPrizeChance = accChance;

      if (thisPrizeChance > randomNumber) {
        roundPrize = key;
      }
    }

    if (roundPrize in prizes) {
      const index = roundPrize as keyof typeof prizes;
      const { prizeQty, originalQty } = prizes[index];
      const hasPrize = originalQty > prizeQty;

      if (hasPrize) {
        message = `你抽中${roundPrize}獎`;
        setPrizes((state) => ({
          ...state,
          [roundPrize]: {
            ...state[index],
            prizeQty: state[index].prizeQty + 1,
          },
        }));
        setRecords((state) => [...state, { message, type: 'win' }]);
        return;
      } else {
        message = `${roundPrize}已經抽完`;
        setRecords((state) => [...state, { message, type: 'noPrize' }]);
        return;
      }
    }

    setRecords((state) => [...state, { message, type: 'notWin' }]);
  };

  const hasNoPrize = Object.values(prizes).every(
    (item) => item.prizeQty >= item.originalQty
  );

  return (
    <div className='container my-5 space-y-4'>
      <div className='text-end'>
        <button
          onClick={handleButtonClick}
          className='rounded bg-amber-400 px-3 py-1.5 transition-colors hover:bg-amber-600 hover:text-white disabled:cursor-not-allowed disabled:bg-amber-200 disabled:hover:text-black'
          disabled={hasNoPrize}
        >
          {!hasNoPrize ? '🎁抽獎' : '🙅‍♂️已無剩餘獎項'}
        </button>
      </div>
      <div className='flex flex-col items-start justify-center gap-4 sm:flex-row'>
        <div>
          <h2 className='text-2xl font-bold text-teal-700'>抽獎資訊</h2>
          <table>
            <thead>
              <tr>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  獎項
                </th>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  中獎機率
                </th>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  獎品數量
                </th>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  中獎數量
                </th>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  剩下數量
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prizes).map(([prize, info]) => (
                <tr key={prize}>
                  <td className='border border-solid border-slate-700 px-1 py-0.5'>
                    獎項{prize}
                  </td>
                  <td className='border border-solid border-slate-700 px-1 py-0.5'>
                    {info.chance}
                  </td>
                  <td className='border border-solid border-slate-700 px-1 py-0.5'>
                    {info.originalQty}
                  </td>
                  <td className='border border-solid border-slate-700 px-1 py-0.5'>
                    {info.prizeQty}
                  </td>
                  <td className='border border-solid border-slate-700 px-1 py-0.5'>
                    {info.originalQty - info.prizeQty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='px-2'>
          <h2 className='text-2xl font-bold text-rose-500'>抽獎紀錄</h2>
          <table>
            <thead>
              <tr>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  次數
                </th>
                <th className='border border-solid border-slate-700 bg-slate-600 px-2 py-1 text-white'>
                  獎項
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={record.message + i.toString()}>
                  <td className='border border-solid border-slate-700 px-2 py-1'>
                    {i + 1}
                  </td>
                  <td
                    className={clsx(
                      'border border-solid border-slate-700 px-2 py-1',
                      {
                        'bg-green-100': record.type === 'win',
                        'bg-yellow-100': record.type === 'noPrize',
                        'bg-red-100': record.type === 'notWin',
                      }
                    )}
                  >
                    {record.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drawing;
