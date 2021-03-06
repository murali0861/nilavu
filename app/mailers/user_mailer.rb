class UserMailer < ActionMailer::Base
  default from: "support@megam.co.in"
  def welcome_email(user)
    logger.debug "user = #{user}"
    @mailer_user = user
    @random_token = user.verification_hash
    @url  = "https://www.megam.co/verified_email.#{@random_token}"
    mail(:to => user.email, :subject => "Megam Account Confirmation")
  end

  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Megam Password Reset"
  end

  def contact_email(user)
    logger.debug "user = #{user[:inputName]}"
    @contact_user = user
    mail(:to => "support@megam.co.in", :subject => "User contact information")
  end

end
