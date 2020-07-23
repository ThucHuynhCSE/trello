import { useDragLayer, XYCoord } from "react-dnd"
import React from 'react'
import { CustomDragLayerContainer } from './styles'
import { Column } from './Column'

function getItemStyles(currenOffset: XYCoord | null): React.CSSProperties {
	if (!currenOffset) {
		return {
			display: 'none'
		}
	}
	const { x, y } = currenOffset
	const transform = `translate ${x}px, ${y}px`
	return {
		transform,
		WebkitTransform: transform
	}
}
const CustomDragLayer: React.FC = () => {
	const { isDragging, item, currenOffset } = useDragLayer(monitor => ({
		item: monitor.getItem(),
		isDragging: monitor.isDragging(),
		currenOffset: monitor.getClientOffset()
	}))
	return isDragging ? (
		<CustomDragLayerContainer style={getItemStyles(currenOffset)}>
			<Column
				id={item.id}
				text={item.text}
				index={item.index}
			/>
		</CustomDragLayerContainer>
	) : null
}
export default CustomDragLayer