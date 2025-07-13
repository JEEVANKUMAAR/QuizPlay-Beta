import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/results/resultsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    candidate: '',

    quiz: '',

    total_correct: '',

    total_incorrect: '',

    total_score: '',

    completed_at: '',

    parties: '',

}

const ResultsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/results/results-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Candidate" labelFor="candidate">
      <Field name="candidate" id="candidate" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="Quiz" labelFor="quiz">
      <Field name="quiz" id="quiz" component={SelectField} options={[]} itemRef={'quizzes'}></Field>
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
      <Field
          type="datetime-local"
          name="completed_at"
          placeholder="CompletedAt"
      />
  </FormField>

  <FormField label="parties" labelFor="parties">
      <Field name="parties" id="parties" component={SelectField} options={[]} itemRef={'parties'}></Field>
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

ResultsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ResultsNew
