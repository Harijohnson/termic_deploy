from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import CompanyDetails, Product,Review
from base.serializers import CompanySerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger








from django.db import IntegrityError

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def companyDetails(request):
    data = request.data
    user = request.user
    try:
        print('before')
        company = CompanyDetails.objects.create(
            user=user,
            companyName=data['companyname'],
            aboutCompany=data['aboutcompany'],
        )
        print('company obj', company)
        serializer = CompanySerializer(company, many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        print('IntegrityError:', e)
        message = {'detail': 'Company for this user already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print('Exception:', e)
        message = {'detail': 'Company creation failed'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def getCompany(request):
    # print('the pk is '+pk)
    user = request.user
    company = CompanyDetails.objects.get(user = user)
    serializer = CompanySerializer(company,many =  False)
    return Response(serializer.data)





@api_view(['GET'])
def getProducts(request):
    # print('request object :',request)
    query = request.query_params.get('keyword')


    if query  == None:
        query=""
    


    products = Product.objects.filter(name__icontains=query)  
    #if the name of the product contains any values in side of the query  filter it and return it back
    
    # print('products          :',products)
    page = request.query_params.get('page')
    
    paginator = Paginator(products,16)  # this Paginatow will decide how many product are in one page second parameter is the thing will have to set 

    # print("paginator op is ",page)
   
    try:
        products = paginator.page(page)
        
    except PageNotAnInteger:
        products =  paginator.page(1)
        
    
    
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page=1

    page = int(page)
    
    serializer = ProductSerializer(products,many =  True)
    # print('serilizer output is :',serializer)
    return Response({'products':serializer.data,'page':page,'pages':paginator.num_pages})




@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] #change this to corousel images
    serializer = ProductSerializer(products,many =  True)
    return Response(serializer.data)




@api_view(['GET'])
def getProduct(request,pk):
    # print('the pk is '+pk)
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)




# @api_view(['GET'])
# def getCategory(request,category):
#     # print('request from frontend is',category)
#     # # category_pk = request.object.get('category')

#     # category = Product.objects.filter(category = category)
#     # # print('category op is ',category)
#     # print('filtered result is :',category)
#         # Use request.query_params.get to get the category from the URL
#     category_param = request.query_params.get('category', '')

#     # Use category__iexact for case-insensitive filtering
#     products = Product.objects.filter(category__iexact=category_param)

#     serializer = ProductSerializer(products,many =  True)
#     return Response({'products': serializer.data})





@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def createProduct(request):
    user = request.user
    company_details = request.company
    product  = Product.objects.create(
        company = company_details,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0, 
        category = 'Sample category',
        description = 'Sample Discription',
        rating = 0,
    )
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk): 
    # print('the pk is '+pk)
    data =request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product is deleted')





@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    
    product = Product.objects.get(_id=product_id)

    
    # Define a list of possible image fields
    image_fields = ['carousel', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9', 'image10','digitalResource']

    # Check if any of the image fields is present in request.FILES
    for field in image_fields:
        if field in request.FILES:
            # Update the corresponding product field with the uploaded image
            setattr(product, field, request.FILES[field])
            product.save()

            # Special handling for 'digitalResource' field
            if field == 'digitalResource':
                product.digital = True  # Set the 'digital' field to True when 'digitalResource' is uploaded
                product.save()

            return Response(f'Image for {field} was Uploaded')

    # If no image field is found in request.FILES
    return Response('No image provided', status=400)

    



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    # print('look below for data from front end')
    # print(data)

    # 1  senario if review alread exist stop the user to syop multiple reviews

    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail':'Product Alread reviewed'}

        return Response (content,status=status.HTTP_400_BAD_REQUEST)
    # 2 No reating or 0
    if data['rating']== 0 :
        content = {'detail':'Select a ratings'}

        return Response (content,status=status.HTTP_400_BAD_REQUEST)

    # 3 create review

    else:
        review =Review .objects.create(
            user  = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )


        reviews = product.review_set.all()
        product.numReviews = len(reviews)


        total = 0
        for i in reviews:
            total += i.rating


        product.rating = total/ len(reviews)
        product.save()

        return Response('Review is Added')
    



