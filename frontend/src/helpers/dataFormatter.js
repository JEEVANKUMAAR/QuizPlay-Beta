import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        questionsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.question_text)
        },
        questionsOneListFormatter(val) {
            if (!val) return ''
            return val.question_text
        },
        questionsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.question_text}
            });
        },
        questionsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.question_text, id: val.id}
        },

        quizzesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.title)
        },
        quizzesOneListFormatter(val) {
            if (!val) return ''
            return val.title
        },
        quizzesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.title}
            });
        },
        quizzesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.title, id: val.id}
        },

        resultsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.total_score)
        },
        resultsOneListFormatter(val) {
            if (!val) return ''
            return val.total_score
        },
        resultsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.total_score}
            });
        },
        resultsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.total_score, id: val.id}
        },

        rolesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        rolesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        rolesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        rolesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        permissionsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        permissionsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        permissionsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        permissionsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        partiesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        partiesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        partiesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        partiesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

}
