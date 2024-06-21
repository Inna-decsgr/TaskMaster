# TaskMaster

#### 프로젝트 이름
작업을 관리할 수 있는 TaskMaster

#### 사용된 기술
React, Recoil, tailwind, datepicker

#### 구현 사항
* 새로운 작업 추가
* 작업 삭제
* 작업 이름 수정
* '할 일', '진행 중', '완료' 카테고리에 맞게 필터링
* 진행 중인 작업의 마감 기한을 설정
* DarkMode로 두 가지 테마(light, dark) 중 선택해서 적용

#### 주요 내용
카테고리별로 필터링해서 작업 보여주기
- Task 컴포넌트에서 `filterTasksByStatus` 함수를 사용해서 작업을 카테고리별로 필터링한다. 이 함수는 전달받은 작업 목록과 필터 값을 기준으로 각기 다른 결과를 반환한다.
- '할 일' 필터가 주어지면 모든 작업을 반환하고, '진행 중' 필터가 주어지면 '진행 중'인 작업만, '완료' 필터가 주어지면 '완료'인 작업만 반환한다.

DatePicker로 마감 기한 설정하기
- `handleChange` 함수는 사용자가 DatePicker에서 날짜를 선택하면, 해당 날짜를 localStorage에 저장한다.
- 각 DatePicker는 고정된 날짜를 표시하기 위해 fixedDate라는 상태를 가지고 이 상태는 useEffect hook을 통해 localstorage에 초기화되고 업데이트된다
- 각 DatePicker는 고유한 localStorage 키를 생성하여 사용하는데, 이 키는 DatePicker의 id와 결합하여 생성된다. => fixedSelectedDate_${id}
- 컴포넌트가 마운트될 때, useEffect hook을 사용하여 고유 key를 통해 해당 DatePicker의 localStorageKey에 저장된 날짜를 가져와 fixedDate 상태를 업데이트 한다. 이를 통해 사용자가 페이지를 새로고침하거나 다시 방문해도 고정된 날짜가 유지되도록 하였다.
=>각 DatePicker는 고유한 localStorage 키를 사용하여 자체적으로 날짜를 관리하고 저장할 수 있다. 따라서 DatePicker는 독립적으로 동작하며, 서로에게 영향을 미치지 않는다.

#### 문제 해결 과정
Recoil 사용해서 status가 바뀌면 UI에도 즉각적으로 반영되도록!
문제
체크박스의 상태 변경 시 localStorage에 저장된 데이터가 실시간으로 업데이트되지 않고 새로고침을 해야만 UI가 변경되는 문제가 발생했다. 이는 React 상태와 localStorage가 별개의 저장소라서 발생한 문제였다.
해결과정
- Recoil 상태 관리 라이브러리를 사용하여 상태 관리를 시도해보았다. atom을 사용하여 상태를 정의하고, Recoil 상태를 통해 React 컴포넌트들이 상태를 공유하도록 설정했다.
- Task 컴포넌트에 'updateLocalStorage' 함수를 만들고, 전달받은 task를 localStorage에 저장하도록 하였다.
- 작업 추가, 수정, 삭제, 업데이트와 관련된 각 함수에서는 useRecoilState의 setTasks를 통해 상태를 업데이트하고, 동시에 `updateLocalStorage` 함수를 호출하여 localStorage에도 변경 사항을 저장하였다.
- useEffect 훅을 사용하여 'tasks'의 상태가 변경될 때마다 'updateLocalStorage' 함수를 호출하여 localStorage의 tasks의 내용도 업데이트했다.
=> Recoil을 사용해서 React와 localStorage 간의 독립성 문제를 해결하고, task의 상태가 UI 상에 실시간으로 반영되도록 구현하였다. 체크박스가 클릭이 되어서 task의 status가 변경이 되거나 다른 작업을 수행할 때마다 UI와 localStorage가 동기화되어 일관된 데이터를 유지할 수 있게 되었다.


#### 배포 링크 
https://taskmaster-phi.vercel.app/

