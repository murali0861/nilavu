module Sources
  module Newbooks
    class Demo < Sources::Newbooks::Base
      def get(options = {})
        { :value => Random.rand(10...100) }
      end

    end

  end
end