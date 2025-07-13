import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
    results: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListResults = ({ results, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);

    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && results.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex rounded dark:bg-dark-900 border items-center overflow-hidden`}>
                          <Link
                              href={`/results/results-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2 divide-stone-300 items-center overflow-hidden dark:divide-dark-700 overflow-x-auto'
                              }
                          >

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Candidate</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.usersOneListFormatter(item.candidate) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Quiz</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.quizzesOneListFormatter(item.quiz) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>TotalCorrect</p>
                                <p className={'line-clamp-2'}>{ item.total_correct }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>TotalIncorrect</p>
                                <p className={'line-clamp-2'}>{ item.total_incorrect }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>TotalScore</p>
                                <p className={'line-clamp-2'}>{ item.total_score }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>CompletedAt</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.completed_at) }</p>
                            </div>

                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/results/results-edit/?id=${item.id}`}
                              pathView={`/results/results-view/?id=${item.id}`}
                              hasUpdatePermission={true}
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && results.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListResults
