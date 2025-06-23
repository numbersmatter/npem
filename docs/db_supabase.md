# Creating Supabase Database

## _Basics of DB Design_

The goal of this design is to create an extensible nonprofit database design which allows nonprofits to enroll clients into their programs via web app.

- Automate reporting
- Enroll Clients with ease
- Track service requests

## Design Overview

Think of your nonprofit has a small college that serves the community. The nonprofits 'clients' are like students that enroll your programs. Each program you offer is like a course. Clients enrolled in that course can see additional details and events that are not available to those not enrolled in the course.

| College          | Nonprofit    |
| ---------------- | ------------ |
| College          | Nonprofit    |
| Department       | Program Area |
| Semester         | Period       |
| Course           | Program      |
| Section          | Section      |
| Seat             | Seat         |
| Assignment       | Event        |
| Assignment Grade | Service      |
| Student          | Client       |

### Create Program Areas

Your program area is like a department in a college. Use this organize access to and control over programs.

This creates the table for the Program Area with a primary key.

```SQL
CREATE TABLE public.program_areas (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  CONSTRAINT program_areas_pkey PRIMARY KEY (id)
) WITH (OIDS=FALSE);
ALTER TABLE public.program_areas ENABLE ROW LEVEL SECURITY;
```

This following code creates a row in the program area for the food pantry.

```SQL
insert into program_areas
  (name, description)
values
  (
    'Food Pantry',
    'All food related services for nonprofit'
  );
```

### Programs

Programs are like courses that a college offers. It is important to note that students do not really enroll in a course. They enroll in a section of that course.

The following creates the program table as well as the indexs to enable faster queries later.

```SQL
CREATE TABLE public.programs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  area_id bigint NOT NULL,
  CONSTRAINT programs_pkey PRIMARY KEY (id),
  CONSTRAINT programs_area_id_fkey FOREIGN KEY (area_id) REFERENCES public.program_areas(id)
) WITH (OIDS=FALSE);
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_programs_area_id ON public.programs USING btree (area_id);
```

Next we will create four programs that are run in this area.

```SQL
insert into programs
	(Name, description, area_id)
values
	(
	'Food Pickup',
	'Weekly food box pickup',
	1,
	),
	(
	'Door Dash',
	'Food Box Delivery',
	1
	),
	(
	'Food Drive-Thru',
	'Large Scale Drive Thru',
	1
	),
	(
	'Backpack Program',
	'weekend backpack program',
	1
	);
```

## Sections

A section creates an instance of the program. Certain programs may be run only in the fall or only during the summer. This section provides clear divisions of the program for reporting purposes.

```SQL
CREATE TABLE public.sections (
 id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
 period_id bigint NOT NULL,
 program_id bigint NOT NULL,
 CONSTRAINT sections_pkey PRIMARY KEY (id),
)WITH (OIDS=FALSE);
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

```
