import { API_BASE_URL } from '../utils';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import TaskForm from '../components/TaskForm';
import UpdateTaskSkeleton from '../_skeletons/UpdateTaskSkeleton';
export default function UpdateTask() {
	const [task, setTask] = useState();
	const { taskId } = useParams();
	useEffect(() => {
		const fetchTask = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
					credentials: 'include',
				});
				if (!res.ok) {	
					throw new Error(`Error ${res.status}: ${res.statusText}`);
				}
				const data = await res.json();
				setTask(data);
			} catch (error) {
				console.error('Failed to fetch task:', error);
			}
		};
		fetchTask();
	}, [taskId]);

	if (!task) {
		return <UpdateTaskSkeleton />;
	}
	return (
		<Box p='3' maxW='4xl' mx='auto'>
			<Heading
				as='h1'
				fontSize='3xl'
				fontWeight='semibold'
				textAlign='center'
				my='7'
			>
				Обновить задачу
			</Heading>
			<TaskForm type='update' task={task} />
		</Box>
	);
}
