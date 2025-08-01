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

import { update, fetch } from '../../stores/quizzes/quizzesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditQuizzesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'title': '',

    instructor: null,

    parties: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { quizzes } = useAppSelector((state) => state.quizzes)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof quizzes === 'object') {
      setInitialValues(quizzes)
    }
  }, [quizzes])

  useEffect(() => {
      if (typeof quizzes === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (quizzes)[el])
          setInitialValues(newInitialVal);
      }
  }, [quizzes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/quizzes/quizzes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit quizzes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit quizzes'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="Title"
    >
        <Field
            name="title"
            placeholder="Title"
        />
    </FormField>

  <FormField label='Instructor' labelFor='instructor'>
        <Field
            name='instructor'
            id='instructor'
            component={SelectField}
            options={initialValues.instructor}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/quizzes/quizzes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditQuizzesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditQuizzesPage
