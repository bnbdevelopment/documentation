---
title: Example
sidebar_label: Example
position: 10
---
# Example Task
In this section, we will guide you through creating a task in yaml format. Our example task will contain 3 exercises: one multiple choice, one text input and one code running exercise. Let's get started!
## 1. Information, description
In these fields you can set basic information regarding the exercise. For the `author` field, you should supply the email address associated with your account.
```yaml
name: Basic Arithmetic operations with Python
description: "
    In this task, you will have to solve basic aritmetic operations with Python.
    If you feel lost, check out [this](https://www.w3schools.com/python/gloss_python_arithmetic_operators.asp) site.
    "
author: ben@infoacademy.hu
```
:::tip Markdown support
You can supply markdown formatted text in the `description` field.
:::
## 2. Creating tasks
### 1. Text Input Task
This is the simplest task form: the users have to submit a short-text answer to a question.
```yaml {2,3,4,5,10}
task:
  - name: Task 1
    type: textinput
    content: "What is the output of the following code snippet?"
    description: "
      `python
        print(10 / 0)
      `
    "
    expectedSolution: 
      - error
      - ZeroDivisionError
```
### 2. Multiple-Choice Task
```yaml {2,3,4,5,9}
task:
  - name: Task 2
    type: multiselect
    content: "Which of the following code snippets are correct?"  
    options:
      - print(310 % 2)
      - import divison
      - print(asd * 3)
    expectedSolution: 
      - print(310 % 2)
      - print(asd * 3)
```
### 3. CodeInput Task
```yaml

```
## 3. Setting up the code file
### Initial code
### Starter code
### Solution code
## Full Example
```yaml showLineNumbers title="tasks/arithmethic.yaml"
name: Basic Arithmetic operations with Python
description: "
    In this task, you will have to solve basic aritmetic operations with Python.
    If you feel lost, check out [this](https://www.w3schools.com/python/gloss_python_arithmetic_operators.asp) site.
    "
author: ben@infoacademy.hu
initFile: "test-init.py"
snippetFile: "test-snippets.py"
task:
  - name: Task 1
    type: textinput
    content: "What is the output of the following code snippet?"
    description: "
      `python
        print(10 / 0)
      `
    "
    expectedSolution: 
      - error
      - ZeroDivisionError
  - name: Task 2
    type: multiselect
    content: "Which of the following code snippets are correct?"  
    options:
      - print(310 % 2)
      - import divison
      - print(asd * 3)
    expectedSolution: 
      - print(310 % 2)
      - print(asd * 3)
  - name: Task 3
    type: codeinput
    content: "Adding together the first 40 odd integers"
    code: {
      initHook: "@first_40_ints_init",
      starterHook: "@first_40_ints_starter",
      solutionHook: "@first_40_ints_init"
    }
generatorOptions:
  shuffleTasks: true
  shuffleOptions: true
  useAllTasks: true
```