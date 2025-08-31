import * as yup from 'yup'

const taskSchema = yup.object().shape({
    title: yup.string().min(2, 'Title is too short').max(100, 'Title is too long').required('Title is required'),
    description: yup.string().nullable(),
    status: yup.string().oneOf(['Pending', 'In Progress', 'Completed']).required('Status is required'),
    duedate: yup.date().min(new Date(), 'Due date must be in the future').required('Due date is required'),
})

export default taskSchema
