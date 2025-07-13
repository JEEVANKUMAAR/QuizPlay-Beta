import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
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

const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

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
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>

                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>App Role</p>

                        <p>{users?.app_role?.name ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Parties</p>

                        <p>{users?.parties?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Quizzes Instructor</p>
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
                            {users.quizzes_instructor && Array.isArray(users.quizzes_instructor) &&
                              users.quizzes_instructor.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/quizzes/quizzes-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.quizzes_instructor?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Results Candidate</p>
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
                            {users.results_candidate && Array.isArray(users.results_candidate) &&
                              users.results_candidate.map((item: any) => (
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
                        {!users?.results_candidate?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;
