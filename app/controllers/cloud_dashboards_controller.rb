class CloudDashboardsController < ApplicationController

  respond_to :html
  def index
    breadcrumbs.add " Dashboard", :cloud_dashboards_path, :class => "icon icon-dashboard"
    @user_id = current_user.id
    @launched_apps_services = current_user.cloud_books
    @cloud_distrib = collapse_cloud_distrib
    @apps_distrib=collapse_apps_distrib
    @apps_distrib.each_pair{|k,v| @apps_distrib.store(k,v.to_i)}
  end

  private

  def collapse_cloud_distrib
    lac = @launched_apps_services.each_with_object(Hash.new{|h,k|h[k]='0'}) do |h,res|
      res[h[:cloud_name].to_sym].succ!
    end
    # this is a stupid idea, move it to enum (Rails 4.1 feature)
    lac[:aws] = 0 unless lac[:aws]
    lac[:hp] = 0 unless lac[:hp]
    lac[:profitbricks] = 0 unless lac[:profitbricks]
    lac[:google] = 0 unless lac[:google]
    lac[:podnix] = 0 unless lac[:podnix]
    lac
  end

  def collapse_apps_distrib
    lac = @launched_apps_services.each_with_object(Hash.new{|h,k|h[k]='0'}) do |h,res|
      res[h[:predef_name].to_sym].succ!
    end
    puts @launched_apps_services.inspect
    puts lac.inspect
    # this is a stupid idea, move it to enum (Rails 4.1 feature)
    lac[:wordpress] = 0 unless lac[:wordpress]
    lac[:riak] = 0 unless lac[:riak]
    lac[:postgres] = 0 unless lac[:postgres]
    lac[:java] = 0 unless lac[:java]
    lac[:rails] = 0 unless lac[:rails]
    lac[:nodejs] = 0 unless lac[:nodejs]
    lac[:play] = 0 unless lac[:play]
    lac[:akka] = 0 unless lac[:akka]
    lac
  end

  def show
    redirect_to cloud_dashboards_path
  end

end
