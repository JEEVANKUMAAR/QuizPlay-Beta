import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/results/resultsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditResults = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    candidate: null,

    quiz: null,

    total_correct: '',

    total_incorrect: '',

    'total_score': '',

    completed_at: new Date(),

    parties: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { results } = useAppSelector((state) => state.results)

  const { resultsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: resultsId }))
  }, [resultsId])

  useEffect(() => {
    if (typeof results === 'object') {
      setInitialValues(results)
    }
  }, [results])

  useEffect(() => {
      if (typeof results === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (results)[el])

          setInitialValues(newInitialVal);
      }
  }, [results])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: resultsId, data }))
    await router.push('/results/results-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit results')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit results'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='Candidate' labelFor='candidate'>
        <Field
            name='candidate'
            id='candidate'
            component={SelectField}
            options={initialValues.candidate}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='Quiz' labelFor='quiz'>
        <Field
            name='quiz'
            id='quiz'
            component={SelectField}
            options={initialValues.quiz}
            itemRef={'quizzes'}

            showField={'title'}

        ></Field>
    </FormField>

    <FormField
        label="TotalCorrect"
    >
        <Field
            type="number"
            name="total_correct"
            placeholder="TotalCorrect"
        />
    </FormField>

    <FormField
        label="TotalIncorrect"
    >
        <Field
            type="number"
            name="total_incorrect"
            placeholder="TotalIncorrect"
        />
    </FormField>

    <FormField
        label="TotalScore"
    >
        <Field
            type="number"
            name="total_score"
            placeholder="TotalScore"
        />
    </FormField>

      <FormField
          label="CompletedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.completed_at ?
                  new Date(
                      dayjs(initialValues.completed_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'completed_at': date})}
          />
      </FormField>

    <FormField label='parties' labelFor='parties'>
        <Field
            name='parties'
            id='parties'
            component={SelectField}
            options={initialValues.parties}
            itemRef={'parties'}

            showField={'name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/results/results-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditResults.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditResults
