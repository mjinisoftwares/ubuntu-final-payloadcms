export default function GoogleMap() {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819317150548!2d36.95599617411852!3d-1.2821934987056138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1349b738c485%3A0xbb5f685384738d1f!2sUbuntu%20Logistics!5e0!3m2!1sen!2ske!4v1788295920439!5m2!1sen!2ske"

        className="w-full h-[450px] border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Ubuntu Logistics & Transport Location"
      />
    </div>
  )
}
