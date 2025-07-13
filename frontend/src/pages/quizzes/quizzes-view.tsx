import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/quizzes/quizzesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const QuizzesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { quizzes } = useAppSelector((state) => state.quizzes)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View quizzes')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View quizzes')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/quizzes/quizzes-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{quizzes?.title}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Instructor</p>

                        <p>{quizzes?.instructor?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>parties</p>

                        <p>{quizzes?.parties?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Results Quiz</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>TotalCorrect</th>

                                <th>TotalIncorrect</th>

                                <th>TotalScore</th>

                                <th>CompletedAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {quizzes.results_quiz && Array.isArray(quizzes.results_quiz) &&
                              quizzes.results_quiz.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/results/results-view/?id=${item.id}`)}>

                                    <td data-label="total_correct">
                                        { item.total_correct }
                                    </td>

                                    <td data-label="total_incorrect">
                                        { item.total_incorrect }
                                    </td>

                                    <td data-label="total_score">
                                        { item.total_score }
                                    </td>

                                    <td data-label="completed_at">
                                        { dataFormatter.dateTimeFormatter(item.completed_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!quizzes?.results_quiz?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/quizzes/quizzes-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

QuizzesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default QuizzesView;
