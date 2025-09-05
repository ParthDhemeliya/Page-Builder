import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { PageComponent, Dataset } from '../types';
import ComponentRenderer from './ComponentRenderer';

interface Props {
  components: PageComponent[];
  onRemoveComponent: (id: string) => void;
  onSelectComponent: (component: PageComponent) => void;
  onReorderComponents: (components: PageComponent[]) => void;
  selectedComponent: PageComponent | null;
  dataset?: Dataset | null;
}

// Sortable Component Wrapper
const SortableComponent: React.FC<{
  component: PageComponent;
  dataset?: Dataset | null;
  selectedComponent: PageComponent | null;
  onRemoveComponent: (id: string) => void;
  onSelectComponent: (component: PageComponent) => void;
}> = ({
  component,
  dataset,
  selectedComponent,
  onRemoveComponent,
  onSelectComponent,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-component-wrapper ${selectedComponent?.id === component.id ? 'selected' : ''}`}
      {...attributes}
    >
      <div className="component-header">
        <div className="drag-indicator" {...listeners}>
          ⋮⋮
        </div>
        <span className="component-type">{component.type}</span>
        <button
          className="remove-button"
          onClick={e => {
            e.stopPropagation();
            onRemoveComponent(component.id);
          }}
          title="Remove"
        >
          ×
        </button>
      </div>
      <div
        onClick={e => {
          e.stopPropagation();
          onSelectComponent(component);
        }}
        style={{ cursor: 'pointer' }}
      >
        <ComponentRenderer component={component} dataset={dataset} />
      </div>
    </div>
  );
};

const Canvas: React.FC<Props> = ({
  components,
  onRemoveComponent,
  onSelectComponent,
  onReorderComponents,
  selectedComponent,
  dataset,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex(
        component => component.id === active.id
      );
      const newIndex = components.findIndex(
        component => component.id === over.id
      );

      const newComponents = arrayMove(components, oldIndex, newIndex);
      onReorderComponents(newComponents);
    }
  };

  // show empty state if no components
  if (components.length === 0) {
    return (
      <div className="canvas">
        <h3>My Page</h3>
        <div className="canvas-empty">
          <p>No components yet. Add some from the left.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas">
      <h3>My Page</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="canvas-content">
            {components.map(component => (
              <SortableComponent
                key={component.id}
                component={component}
                dataset={dataset}
                selectedComponent={selectedComponent}
                onRemoveComponent={onRemoveComponent}
                onSelectComponent={onSelectComponent}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Canvas;
