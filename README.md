# TaskMaster

#### 프로젝트 이름
작업을 관리할 수 있는 TaskMaster

#### 사용된 기술
React, Recoil, React-datepicker, Tailwindcss

#### 구현 사항
1. 할 일 관리
   - 새로운 할 일 추가
   - 할 일 완료 상태 변경
   - 할 일 수정
   - 할 일 삭제
2. 필터링
   - '할 일', '진행 중', '완료' 상태별 필터링
3. 다크 모드 지원
   - 다크 모드 및 라이트 모드 전환 기능
   - 로컬 저장소를 통한 모드 상태 유지
4. 달력 기능
   - 할 일에 목표 기한 설정
   - 날짜 선택 및 변경
5. 디바운스
   - 입력 시 디바운스를 통한 성능 최적화

#### 주요 내용
**카테고리별로 필터링해서 작업 보여주기**  
Task 컴포넌트에서 `filterTasksByStatus` 함수를 사용해서 작업을 카테고리별로 필터링한다. 이 함수는 전달받은 작업 목록과 필터 값을 기준으로 각기 다른 결과를 반환한다.
- '할 일' 필터가 주어지면 모든 작업을 반환
- '진행 중' 필터가 주어지면 '진행 중'인 작업을 반환
- '완료' 필터가 주어지면 '완료'인 작업만 반환
```js
function filterTasksByStatus(tasks, statusFilter) {
  switch (statusFilter) {
    case '할 일':
      return tasks;
    case '진행 중':
      return tasks.filter(task => task.status === '진행 중');
    case '완료':
      return tasks.filter(task => task.status === '완료');
    default:
      return tasks;
  }
}
```

**DatePicker로 마감 기한 설정하기**  
`handleChange` 함수는 사용자가 DatePicker에서 날짜를 선택하면, 해당 날짜를 localStorage에 저장한다.
- 각 DatePicker는 고정된 날짜를 표시하기 위해 fixedDate라는 상태를 가지고 이 상태는 useEffect hook을 통해 localstorage에 초기화되고 업데이트된다
- 각 DatePicker는 고유한 localStorage 키를 생성하여 사용하는데, 이 키는 DatePicker의 id와 결합하여 생성된다. => fixedSelectedDate_${id}
- 컴포넌트가 마운트될 때, useEffect hook을 사용하여 고유 key를 통해 해당 DatePicker의 localStorageKey에 저장된 날짜를 가져와 fixedDate 상태를 업데이트 한다. 이를 통해 사용자가 페이지를 새로고침하거나 다시 방문해도 고정된 날짜가 유지되도록 하였다.
```js
const localStorageKey = `fixedSelectedDate_${id}`;

useEffect(() => {
  const storedDate = localStorage.getItem(localStorageKey);
  if (storedDate) {
    setFixedDate(new Date(storedDate));
  }
}, [localStorageKey]);

const handleChange = (date) => {
  if (date) {
    localStorage.setItem(localStorageKey, date.toISOString());
    setFixedDate(date);
  }
  setSelectedDate(date);
};

```
각 DatePicker는 고유한 localStorage 키를 사용하여 자체적으로 날짜를 관리하고 저장할 수 있다. 따라서 DatePicker는 독립적으로 동작하며, 서로에게 영향을 미치지 않는다.

#### 문제 해결
상태 관리 및 UI 실시간 반영  

🥲 **문제설명** : 체크박스의 상태 변경이 일어나면 로컬 스토리지에 저장된 데이터가 실시간으로 업데이트되지 않고 새로고침을 해야만 UI가 변경되는 문제가 발생했다. 로컬 스토리지의 데이터가 변경이 되면 그 데이터가 UI에도 실시간으로 반영되는것을 원했는데 원하는대로 동작하지 않았다. 이는 react 상태와 로컬 스토리지가 별개의 독립적인 저장소로 동작하기 때문에 발생한 문제라는 것을 알게 되었다. 실시간으로 로컬 스토리지와 동기화를 원하면 직접적인 로컬 스토리지 업데이트 로직을 추가하는 방법도 있다고 하는데 이러한 접근 방식은 잠재적인 위험을 동반할 수 있다고 해서 Recoil 상태 관리 라이브러리를 사용해보기로 했다.


🥲 **해결 방법**  
(1) Recoil 상태 관리 라이브러리를 사용하여 상태 관리를 시도해보았다. `atom`을 사용하여 상태를 정의하고, Recoil 상태를 통해 React 컴포넌트들이 상태를 공유하도록 설정했다.

**`tasksState`** atom 정의
```js
const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

export const tasksState = atom({
  key: 'tasksState',   
  default: initialTasks,
});
```
(2) Task 컴포넌트에 'updateLocalStorage' 함수를 만들고, 전달받은 task를 localStorage에 저장하도록 하였다.  
작업 추가, 수정, 삭제, 업데이트와 관련된 각 함수에서는` useRecoilState`의 `setTasks`를 통해 상태를 업데이트하고, 동시에 `updateLocalStorage` 함수를 호출하여 `localStorage`에도 변경 사항을 저장하였다.  
`useEffect` 훅을 사용하여 'tasks'의 상태가 변경될 때마다 'updateLocalStorage' 함수를 호출하여 `localStorage`의 `tasks`의 내용도 업데이트했다.

**'Task' 컴포넌트에서 상태 업데이트 및 로컬 스토리지 동기화**
```js
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tasksState } from '../atoms';
import Tasks from './Tasks';
import AddButton from './AddButton';

export default function Task({ filter }) {
  const [tasks, setTasks] = useRecoilState(tasksState);
  
  const handleAdd = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleUpdate = (updated) => {
    const updatedTasks = tasks.map((t) => (t.id === updated.id ? updated : t));
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleDelete = (deleted) => {
    const updatedTasks = tasks.filter((t) => t.id !== deleted);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleEdit = (edited) => {
    if (edited) {
      const updatedTasks = tasks.map((t) => (t.id === edited.id ? edited : t));
      setTasks(updatedTasks);
      updateLocalStorage(updatedTasks);
    }
  };

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    updateLocalStorage(tasks);
  }, [tasks]);

  // 필터링 및 컴포넌트 렌더링 코드 생략
}

```


🥲 문제 해결 과정을 아래 블로그 링크에 좀 더 자세하게 기술해두었다😚  
https://velog.io/@kimina/TaskMaster-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Recoil-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0


🥲 **결론**  
Recoil을 사용해서 React 어플리케이션에서 `localStorage`와의 독립성 문제를 해결했다. 이전에는 작업 상태가 변경되어도 UI가 즉시 업데이트되지 않았고, 사용자가 페이지를 직접 새로고침해야만 `localStorage`의 데이터가 반영이 되는 문제가 있었다. Recoil의 tasksState atom을 사용하여 작업의 상태가 변경이 일어나면 Recoil 상태가 자동으로 UI에 반영되도록 구현하였다. 결과적으로 사용자는 실시간으로 업데이트된 데이터를 확인할 수 있게 되었고, `updateLocalStorage` 함수를 통해 Recoil 상태가 변경이 일어나면 localStorage도 즉시 업데이트된다. 사용자 경험을 향상시킬 수 있었고 데이터의 일관성을 유지할 수 있게 되었다.


#### 배포 링크  
https://taskmaster-phi.vercel.app/

