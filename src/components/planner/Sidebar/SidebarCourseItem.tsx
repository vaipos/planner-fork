import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { DragDataFromCourseList, DraggableCourse } from '../types';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckIcon from '@mui/icons-material/Check';
import { getSemesterHourFromCourseCode } from '@/utils/utilFunctions';
/** UI Implementation of sidebar course */
export function SidebarCourseItem({ course }: { course: DraggableCourse }): JSX.Element {
  // Course would be marked incomplete ONLY if requirement needed course
  // Maybe DraggableCourse needs to take a prop specifying if it's needed or nah?
  // TODO: Update course status tag
  return (
    <div
      className={`cursor-grab ${
        course.taken && 'opacity-50'
      } flex h-[40px] flex-row items-center justify-between rounded-md border border-[#EDEFF7] bg-white py-1.5 px-2 text-[10px] text-[#1C2A6D] drop-shadow-sm`}
    >
      <span className="text-[16px] text-[#1C2A6D]">
        <DragIndicatorIcon fontSize="inherit" className="mr-3 text-[16px] text-[#D4D4D4]" />
        {course.code}
      </span>
      {course.hours && course.hours < getSemesterHourFromCourseCode(course.code)! && (
        <div>{course.hours}</div>
      )}
      {course.status === 'complete' && <CheckIcon fontSize="small" />}
    </div>
  );
}

export default function DraggableSidebarCourseItem({
  dragId,
  course,
}: {
  dragId: UniqueIdentifier;
  course: DraggableCourse;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dragId,
    data: { from: 'course-list', course } as DragDataFromCourseList,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
    >
      <SidebarCourseItem course={course} />
    </div>
  );
}
