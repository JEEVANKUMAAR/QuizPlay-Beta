import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/results/resultsSlice'
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

const ResultsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { results } = useAppSelector((state) => state.results)

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
              <title>{getPageTitle('View results')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View results')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/results/results-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Candidate</p>

                        <p>{results?.candidate?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Quiz</p>

                        <p>{results?.quiz?.title ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TotalCorrect</p>
                  <p>{results?.total_correct || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TotalIncorrect</p>
                  <p>{results?.total_incorrect || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TotalScore</p>
                  <p>{results?.total_score || 'No data'}</p>
                </div>

                <FormField label='CompletedAt'>
                    {results.completed_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={results.completed_at ?
                        new Date(
                          dayjs(results.completed_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No CompletedAt</p>}
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>parties</p>

                        <p>{results?.parties?.name ?? 'No data'}</p>

                </div>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/results/results-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ResultsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ResultsView;
