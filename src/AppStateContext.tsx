import React, { createContext, useReducer, useContext } from "react"
import { findItemIndexById } from './utils/findItemIndexById'
import { nanoid } from 'nanoid'
import { moveItem } from "./moveItem"


interface AppStateContextProps {
	state: AppState
	dispatch: React.Dispatch<any>

}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)
const appData: AppState = {
	lists: [
		{
			id: "0",
			text: "To Do",
			tasks: [{ id: "c0", text: "Generate app scaffold" }]
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [{ id: "c2", text: "Learn Typescript" }]
		},
		{
			id: "2",
			text: "Done",
			tasks: [{ id: "c3", text: "Begin to use static typing" }]
		}
	]
}
interface Task {
	id: string
	text: string
}
interface List {
	id: string
	text: string
	tasks: Task[]
}
type Action =
	| {
		type: "ADD_LIST"
		payload: string
	}
	| {
		type: "ADD_TASK"
		payload: { text: string; taskId: string }
	}
	| {
		type: "MOVE_TASK"
		payload: { dragIndex: number; hoverIndex: number }
	}

export interface AppState {
	lists: List[]
}

const appStateReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case "ADD_TASK": {
			const targetLaneIndex = findItemIndexById(
				state.lists,
				action.payload.taskId
			)
			state.lists[targetLaneIndex].tasks.push({
				id: nanoid(),
				text: action.payload.text
			})
			return {
				...state
			}
		}
		case "ADD_TASK": {
			const visibilityExample = "Too visible"
			return {
				...state
			}
		}
		case "MOVE_TASK": {
			const { dragIndex, hoverIndex } = action.payload
			state.lists = moveItem(state.lists, dragIndex, hoverIndex)
			return {
				...state
			}
		}
		default: {
			return state
		}

	}
}
export const useAppState = () => {
	return useContext(AppStateContext)
}
export const AppStateProvider = ({ children }: React.PropsWithChildren<
	{}>) => {
	const [state, dispatch] = useReducer(appStateReducer, appData)
	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	)
}