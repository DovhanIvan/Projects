import { useForm } from "react-hook-form";
import "./contact.scss"

function Contact () {
const { handleSubmit, register, formState: {errors} } = useForm();

function onSubmit(values) {
  console.log(values)
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h1>Contact</h1>
      <div className="form-item">
        <input
        className={errors.name ? 'error' : ''}
        type="text"
        placeholder="Name"
        {...register( "name", {
          required: "Required",
          pattern: {
            value: /(\w|\s|[\.\'-])+/,
            message: "Incorrect name"
          }
        })}
        />
        <p className={'error-message'}>{errors.name && errors.name.message}</p>
      </div>
      <div className="form-item">
  <input 
  className={errors.email ? 'error' : ''}
  type="email"
  placeholder="Email"
  {...register("email", {
    required: "Requrired",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "invalid email address"
    }
  })}
  />
 <p className={'error-message'}>{errors.email && errors.email.message}</p>
      </div>
      <div className="form-item">
  <input 
  className={errors.subject ? 'error' : ''}
  type="email"
  placeholder="Subject"
  {...register("subject", {
    required: "Requrired",
    pattern: {
      value: /(w|\s|[\.\'-])+/,
      message: "invalid email address"
    }
  })}
  />
 <p className={'error-message'}>{errors.subject  && errors.subject.message}</p>
      </div>
      <div className="form-item">
  <textarea 
  className={errors.message ? 'error' : ''}
  placeholder="Type Your message"
  rows="5"
  {...register("message", {
    required: "Requrired",
    pattern: {
      value: /(w|\s|[\.\'-])+/,
      message: "Incorrect message"
    }
  })}
  />
 <p className={'error-message'}>{errors.message  && errors.message.message}</p>
      </div>
      <button type="submit">submit</button>
    </form>
    
  )
}

export default Contact;