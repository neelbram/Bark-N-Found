'use client';

import { useState, type ChangeEvent } from 'react';
import styles from './page.module.css';

export default function SteppedForm() {

  const [formState, setFormState] = useState({
    currentStep: 1,
    fields: {
      name: null,
      email: null,
      age: null,
      height: null,
      message: null,
    }
  });

  // @ts-ignore
  function manageFormState(previousFormState, currentChange) {
    const newFormState = {...previousFormState};
    newFormState.fields = {...previousFormState.fields, ...currentChange};
    if (newFormState.fields.name == null || newFormState.fields.email == null) {
      newFormState.currentStep = 1;
    } else if (newFormState.fields.age == null || newFormState.fields.height == null) {
      newFormState.currentStep = 2;
    } else if (newFormState.fields.message == null) {
      newFormState.currentStep = 3;
    }
    return newFormState;
  }

  function handleFieldUpdate(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    // @ts-ignore
    setFormState((previousState) => (manageFormState(previousState, {[name]: value})));
    console.log(event.target);
  };

  const formClassName = `${styles.form} gray-bg`;
  const sectionOneClassName = `${styles.fields} ${formState.currentStep === 1 ? '' : styles.hide}`;
  const sectionTwoClassName = `${styles.fields} ${formState.currentStep === 2 ? '' : styles.hide}`;
  const sectionThreeClassName = `${styles.fields} ${formState.currentStep === 3 ? '' : styles.hide}`;

  return (
    <div className="content">
      <div className="demo-notes padding-1">
        <p>
          <strong>What is happening in this example?</strong>
        </p>
        <ul>
          <li>The form has three sections</li>
          <li>The user can only move to the next section when the previous section is valid</li>
          <li>The user can only view a section if it is valid, or, the current section she needs to complete</li>
        </ul>
      </div>
      <h1>Tell us about yourself</h1>
      <form className={formClassName}>
          <fieldset className={styles.fieldset}>
            <h1 data-step="1">1. Heading</h1>
            <div className={sectionOneClassName}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter the name of the recipient" onBlur={handleFieldUpdate} required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter a valid email address for the recipient" onBlur={handleFieldUpdate} required />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
          <h1 data-step="2">2. Heading</h1>
            <div className={sectionTwoClassName}>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" min="10" max="100" onBlur={handleFieldUpdate} required />
              <label htmlFor="height">Height</label>
              <input type="number" id="height" name="height" min="10" max="300" onBlur={handleFieldUpdate} required />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
          <h1 data-step="3">3. Heading</h1>
            <div className={sectionThreeClassName}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Enter your message" onBlur={handleFieldUpdate} required />
            </div>
          </fieldset>

        </form>
    </div>
  )
}
