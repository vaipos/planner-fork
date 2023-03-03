import { FC, useMemo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Button from '../Button';
import SwitchVerticalIcon from '@/icons/SwitchVerticalIcon';
import ColorSwatchIcon from '@/icons/ColorSwatchIcon';
import ChevronIcon from '@/icons/ChevronIcon';
import { tagColors } from './utils';
import { useSemestersContext } from './SemesterContext';
import { SemesterType } from '@prisma/client';
import Checkbox from '../Checkbox';

const itemClasses =
  'flex items-center gap-x-3 border-b border-neutral-300 px-3 py-2 hover:bg-neutral-200 cursor-pointer';

const contentClasses = 'w-64 rounded-md border border-neutral-300 bg-generic-white z-[9999]';

const SortByDropdown: FC = () => {
  const { toggleColorFilter, toggleSemesterFilter, toggleYearFilter, allSemesters, filters } =
    useSemestersContext();

  const allYears = useMemo(
    () => new Set(allSemesters.map((semester) => semester.code.year)),
    [allSemesters],
  );

  const semestersDisplayMap = {
    [SemesterType.f]: 'Fall',
    [SemesterType.s]: 'Spring',
    [SemesterType.u]: 'Summer',
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          aria-label="Filter by options"
          size="medium"
          color="tertiary"
          icon={<SwitchVerticalIcon />}
        >
          <span className="whitespace-nowrap">Filter By</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={contentClasses + ' animate-[slideUpAndFade_0.3s]'}
          sideOffset={10}
          align="start"
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={itemClasses + ' justify-between border-none'}>
              <div className="flex items-center gap-x-3">
                <ColorSwatchIcon />
                <span>Filter by color</span>
              </div>
              <ChevronIcon className="h-3 w-3" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                data-no-dnd="true"
                className={contentClasses + ' animate-[slideLeftAndFade_0.3s]'}
                sideOffset={-10}
                alignOffset={0}
              >
                {Object.entries(tagColors).map(([color, classes]) => (
                  <DropdownMenu.Item key={`${color}-${classes}`} className={itemClasses}>
                    <Checkbox
                      checked={filters.some(
                        (filter) => filter.type === 'color' && filter.color === color,
                      )}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleColorFilter(color as keyof typeof tagColors)}
                    />
                    <div className={`h-5 w-5 rounded-sm border ${classes}`}></div>
                    <span>
                      {color.substring(0, 1).toUpperCase() + color.substring(1) || 'None'}
                    </span>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={itemClasses + ' justify-between border-none'}>
              <div className="flex items-center gap-x-3">
                <ColorSwatchIcon />
                <span>Filter by year</span>
              </div>
              <ChevronIcon className="h-3 w-3" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                data-no-dnd="true"
                className={contentClasses + ' animate-[slideLeftAndFade_0.3s]'}
                sideOffset={-10}
                alignOffset={0}
              >
                {Array.from(allYears).map((year) => (
                  <DropdownMenu.Item key={year} className={itemClasses}>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      checked={filters.some(
                        (filter) => filter.type === 'year' && filter.year === year,
                      )}
                      onCheckedChange={() => toggleYearFilter(year)}
                    />
                    {year}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={itemClasses + ' justify-between border-none'}>
              <div className="flex items-center gap-x-3">
                <ColorSwatchIcon />
                <span>Filter by semester</span>
              </div>
              <ChevronIcon className="h-3 w-3" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                data-no-dnd="true"
                className={contentClasses + ' animate-[slideLeftAndFade_0.3s]'}
                sideOffset={-10}
                alignOffset={0}
              >
                {Object.keys(semestersDisplayMap).map((semesterType) => (
                  <DropdownMenu.Item key={semesterType} className={itemClasses}>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      checked={filters.some(
                        (filter) => filter.type === 'semester' && semesterType === filter.semester,
                      )}
                      onCheckedChange={() => toggleSemesterFilter(semesterType as SemesterType)}
                    />
                    {semestersDisplayMap[semesterType as SemesterType] + ' semester'}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SortByDropdown;
