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

import { create } from '../../stores/questions/questionsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    question_text: '',

    option_a: '',

    option_b: '',

    option_c: '',

    option_d: '',

    correct_ans: '',

    parties: '',

}

const QuestionsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/questions/questions-list')
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

    <FormField label="QuestionText" hasTextareaHeight>
        <Field name="question_text" as="textarea" placeholder="QuestionText" />
    </FormField>

  <FormField
      label="OptionA"
  >
      <Field
          name="option_a"
          placeholder="OptionA"
      />
  </FormField>

  <FormField
      label="OptionB"
  >
      <Field
          name="option_b"
          placeholder="OptionB"
      />
  </FormField>

  <FormField
      label="OptionC"
  >
      <Field
          name="option_c"
          placeholder="OptionC"
      />
  </FormField>

  <FormField
      label="OptionD"
  >
      <Field
          name="option_d"
          placeholder="OptionD"
      />
  </FormField>

  <FormField
      label="CorrectAnswer"
  >
      <Field
          name="correct_ans"
          placeholder="CorrectAnswer"
      />
  </FormField>

  <FormField label="parties" labelFor="parties">
      <Field name="parties" id="parties" component={SelectField} options={[]} itemRef={'parties'}></Field>
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/questions/questions-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

QuestionsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default QuestionsNew
