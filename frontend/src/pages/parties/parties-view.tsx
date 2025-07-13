import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/parties/partiesSlice'
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

const PartiesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { parties } = useAppSelector((state) => state.parties)

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
              <title>{getPageTitle('View parties')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View parties')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/parties/parties-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{parties?.name}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Users Parties</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>First Name</th>

                                <th>Last Name</th>

                                <th>Phone Number</th>

                                <th>E-Mail</th>

                                <th>Disabled</th>

                            </tr>
                            </thead>
                            <tbody>
                            {parties.users_parties && Array.isArray(parties.users_parties) &&
                              parties.users_parties.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/users/users-view/?id=${item.id}`)}>

                                    <td data-label="firstName">
                                        { item.firstName }
                                    </td>

                                    <td data-label="lastName">
                                        { item.lastName }
                                    </td>

                                    <td data-label="phoneNumber">
                                        { item.phoneNumber }
                                    </td>

                                    <td data-label="email">
                                        { item.email }
                                    </td>

                                    <td data-label="disabled">
                                        { dataFormatter.booleanFormatter(item.disabled) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!parties?.users_parties?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Questions parties</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>QuestionText</th>

                                <th>OptionA</th>

                                <th>OptionB</th>

                                <th>OptionC</th>

                                <th>OptionD</th>

                                <th>CorrectAnswer</th>

                            </tr>
                            </thead>
                            <tbody>
                            {parties.questions_parties && Array.isArray(parties.questions_parties) &&
                              parties.questions_parties.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/questions/questions-view/?id=${item.id}`)}>

                                    <td data-label="question_text">
                                        { item.question_text }
                                    </td>

                                    <td data-label="option_a">
                                        { item.option_a }
                                    </td>

                                    <td data-label="option_b">
                                        { item.option_b }
                                    </td>

                                    <td data-label="option_c">
                                        { item.option_c }
                                    </td>

                                    <td data-label="option_d">
                                        { item.option_d }
                                    </td>

                                    <td data-label="correct_ans">
                                        { item.correct_ans }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!parties?.questions_parties?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Quizzes parties</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {parties.quizzes_parties && Array.isArray(parties.quizzes_parties) &&
                              parties.quizzes_parties.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/quizzes/quizzes-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!parties?.quizzes_parties?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Results parties</p>
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
                            {parties.results_parties && Array.isArray(parties.results_parties) &&
                              parties.results_parties.map((item: any) => (
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
                        {!parties?.results_parties?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/parties/parties-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

PartiesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default PartiesView;
